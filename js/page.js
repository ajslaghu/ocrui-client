define(['jquery','events','mets','toolbar','mustache','mybackbone','templates'],
        function ($,events,mets,toolbar,mustache,mybackbone,templates) {
    "use strict";




    var facsimileRendered = undefined;
    var editorRendered = undefined;

    events.on('facsimileRendered', function (d) { facsimileRendered.resolve(d); });

    events.on('facsimileRenderError', function (d) { facsimileRendered.reject(d); });

    events.on('editorRendered', function (d) { editorRendered.resolve(d); });

    events.on('editorRenderError', function (d) { editorRendered.reject(d); });

    events.on('changePage', function (data) {

        /* create new deferreds. clear earlier ones before.
         */
        /* clear earlier deferred callbacks before starting */
        if (facsimileRendered !== undefined) {
            facsimileRendered.resolve();
        }
        facsimileRendered = new $.Deferred();

        if (editorRendered !== undefined) {
            editorRendered.resolve();
        }
        editorRendered = new $.Deferred();

        events.trigger('nowProcessing',"page-change");

        $.when(facsimileRendered,editorRendered).then(
            function() {
                events.trigger('changePageDone',data);
                events.trigger('endProcessing',"page-change");
            },
            function(data) {
                events.trigger('changePageError',{
                    error:'changePageError',
                    message: data
                });
                events.trigger('endProcessing',"page-change");
            });
    });




    var View = mybackbone.View.extend({
        initialize: function() {
            this.options = {};
            var that = this;
            this.pageChangeQueue = [];
            this.pageChangeRequested = false;

            toolbar.registerKeyboardShortcut(33, function() {
                that.pagePrevious();
            });
            toolbar.registerKeyboardShortcut(34, function() {
                that.pageNext();
            });

            toolbar.registerWidget({
                id:'page-selector',
                view:this,
                index: 1,
                classes: "btn-group form-horizontal input-prepend input-append pull-right",
                modes:['page'] });

        },
        el : '#page-selector',
        myEvents: {
            /*
            'requestNextPage' : 'pageNext',
            'requestPrevPage' : 'pagePrevious',
            */
            'changePage' : 'changePage',
            'changePageMets' : 'changePageMets',
        },
        events: {
            'click #page-next': 'pageNext',
            'click #page-previous': 'pagePrevious',
            'change #page-number': 'pageNumber'
        },
        changePage: function(data) {
            this.options.pageNumber = data.pageNumber;
            this.render();
        },
        changePageMets: function(doc) {
            var pages = doc.getNumberOfPages();
            this.setPageNumberBounds(1,pages);
            this.render();
        },
        pageNext : function (ev) {
            $('#page-number').attr('value',this.getPageNumber() + 1);
            this.pageNumber();
        },
        pagePrevious : function (ev) {
            $('#page-number').attr('value',this.getPageNumber() - 1);
            this.pageNumber();
        },
        pageNumber : function (ev) {
            this.boundedSetPage(this.getPageNumber());
        },
        getPageNumber : function () {
            var s = $('#page-number').attr('value');
            var i = parseInt(s,10);
            if (isNaN(i)) return 1;
            return i;
        },
        setPageNumber : function (number) {
                // queues page changes

                var that = this;
                this.pageChangeQueue.push(number);
                if (this.pageChangeRequested) return;
                this.pageChangeRequested = true;
                setTimeout(function() {that.processPageChange();},100);
        },
        processPageChange: function () {
            // TODO: this don't work properly yet.
            var number = this.pageChangeQueue[this.pageChangeQueue.length-1];
            this.pageChangeRequested = false;
            this.pageChangeQueue = [];
            events.trigger('changePage',{pageNumber:number});
        },
        boundedSetPage : function(number) {
            if (number < this.options.minPage) number = this.options.minPage;
            if (number > this.options.maxPage) number = this.options.maxPage;
            this.setPageNumber(number);
        },
        setPageNumberBounds : function (min,max) {
            this.options.minPage = min;
            this.options.maxPage = max;
            var pageNumber = this.getPageNumber();
            if ((pageNumber < this.options.minPage) ||
                (pageNumber > this.options.maxPage)) {
                this.boundedSetPage(pageNumber);
            }
        },
        render: function() {
            var context = {
                pageNumber: this.options.pageNumber,
                pages: this.options.maxPage
            };
            var tpl = templates.get('page-selector');
            this.$el.html(mustache.render(tpl,context));
        }
    });

    var view = new View();

    return { }; // no external interface, this just registers a widget

});

