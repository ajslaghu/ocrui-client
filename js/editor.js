define(['spinner','events','jsdiff','codemirror','backbone'],function (spinner,events,jsdiff) {

    EmptyView = Backbone.View.extend({
        el: '#editor',
        render: function() {
            this.$el.html("<div>empty</div>");
        }
    });
    View = Backbone.View.extend({

        initialize: function () {
            this.spinner = spinner.createSpinner();
            var element = this.$el.get(0);
            this.cMirror = CodeMirror(element, {
                value: "",
                lineWrapping: true,
                mode: 'html'
            });
            events.on('cursorToCoordinate',function(data) {

                if (this.alto) {
                    var index = this.alto.getWordAt(data.x,data.y)
                    editor.view.moveCursorToWord(index);    
                }

            });
        },
        el: '#editor',
        moveCursorToWord: function(wordIndex) {
            var content = this.cMirror.getValue();
            var line = 0;
            var ch = 0;
            inMiddleOfWord = false;
            if (wordIndex == undefined) return;
            for (var i in content) {
                var c = content[i];
                if (c == '\n') {
                    line ++;
                    ch = 0
                }
                if (c.match(/\S/)) {
                    if (inMiddleOfWord) wordIndex --;
                    if (wordIndex == 0) break;
                    inMiddleOfWord = false;
                } else {
                    inMiddleOfWord = true;
                }
                ch ++;
            }
            this.cMirror.setCursor(line,ch);
            this.$el.find('.CodeMirror').focus();
        },
        changed: function (instance) {
            var content = instance.getValue().split(/\s+/);
            var original = this.alto.getStringSequence();
            var out = jsdiff.diff(original,content);
            //console.log(out);

        },
        cursorActivity: function (instance) {
            var content = instance.getValue();
            var cursor = instance.getCursor();
            var line = cursor.line;
            var ch = cursor.ch;
            var wordIndex = 0;
            var inMiddleOfWord = false;
            for (var i in content) {
                var c = content[i];
                if (c == '\n') line --;
                if (c.match(/\S/)) {
                    if (inMiddleOfWord) wordIndex ++;
                    inMiddleOfWord = false;
                } else {
                    inMiddleOfWord = true;
                }
                if (line == 0) {
                    ch --;
                    if (ch == 0) {
                        break;
                    }
                }
            }
            word = this.alto.getNthWord(wordIndex);
            events.trigger('changeCoordinates',word);
        },
        setAlto: function(alto) {
            this.alto = alto;
        },
        showSpinner : function() {
            // TODO: dim canvas
            this.spinner.spin(this.$el.get(0));
        },
        render: function() {
            this.spinner.stop();
            var s = this.alto.getString();
            this.cMirror.setValue(s);
            var that = this;
            if (this.alto.get('status') == 'success') {
                this.cMirror.on('cursorActivity',function (instance) {
                    that.cursorActivity(instance);
                });
                this.cMirror.on('change',function (instance) {
                    that.changed(instance);
                });
            } else {
            
                var $e = $('<div> ' + this.alto.get('status') + '. </div>');
                $e.css('width','100%');
                $e.css('height','100%');
                this.$el.html($e);
            }
        }
    });

    return {
        view: new View(),
        empty: new EmptyView(),
    }

});
