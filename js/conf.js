define([],function () {
    var kkbd = [
        "А", "а", "Ä", "ä", "Б", "б", "В", "в", "Г", "г", "Д", "д", "Е", "е", "Ё", "ё", "Ӗ", "ӗ", "Ж", "ж", "З", "з", "И", "и", "Й", "й", "К", "к", "Л", "л", "ԕ", "ԕ", "М", "м", "Н", "н", "Ҥ", "ҥ", "О", "о", "Ӧ", "ӧ", "П", "п", "Р", "р", "Ԗ", "ԗ", "С", "с", "Т", "т", "У", "у", "Ӱ", "ӱ", "Ф", "ф", "Х", "х", "Ц", "ц", "Ч", "ч", "Ш", "ш", "Щ", "щ", "Ъ", "ъ", "Ы", "ы", "Ӹ", "ӹ", "Ь", "ь", "Э", "э", "Ӭ", "ӭ", "Ю", "ю", "Я", "я", "Ы̆", "ы̆", "Ŏ", "ŏ"
    ];
    var lkbd = [
        "A", "a", "Ä", "ä", "Å", "å", "B", "в", "C", "c", "Ç", "ç", "D", "d", "Ə", "ә", "E", "e", "F", "f", "G", "g", "Y", "y", "I", "i", "J", "j", "K", "k", "L", "l", "M", "m", "N", "n", "O", "o", "Ö", "ö", "P", "p", "R", "r", "S", "s", "Ş", "ş", "T", "t", "U", "u", "V", "v", "X", "x", "Z", "z", "Ƶ", "ƶ", "Ь", "ь", "rx", "lh"
    ];
    var latinkbd = [
        "A", "a", "B", "b", "C", "c", "D", "d", "E", "e", "F", "f", "G", "g", "H", "h", "I", "i", "J", "j", "K", "k", "L", "l", "M", "m", "N", "n", "O", "o",
        "P", "p", "Q", "q", "R", "r", "S", "s", "T", "t", "U", "u", "V", "v", "W", "w", "X", "x", "Y", "y", "Z", "z"
    ];
    var livkbd = [
        "A",  "Ä", "B", "D",  "Ḑ", "E", "F", "G", "H", "I", "J", "K", "L", "Ļ", "M", "N", "Ņ", "O", "Ȯ", "Õ", "P", "R", "Ŗ", "S", "Š", "T", "Ț", "U", "V", "Z", "Ž", "C", "Q", "W", "X", "Y",
        "a", "ä", "b", "d", "ḑ", "e", "f", "g", "h", "i", "j", "k", "l", "ļ", "m", "n", "ņ", "o", "ȯ", "õ", "p", "r", "ŗ", "s", "š", "t", "ț", "u", "v", "z", "ž", "c", "q", "w", "x", "y",
        "Ā", "Ǟ", "Ē", "Ī", "Ō", "Ȱ", "Ȭ", "Ū",
        "ā", "ǟ", "ē", "ī", "ō", "ȱ", "ȭ", "ū"
    ];

    return {

        buttons: [
            /*
            {
                id:'edit-layout',
                toggle:true,
                icon:'icon-th',
                title:'Edit page layout',
                modes:['page'],
                event:'toggleShowLayout',
            }
            */
            {
                id: 'download-xml',
                index: 44,
                toggle: false,
                active: false,
                icon: 'icon-download',
                title: 'Download page XML',
                modes: ['page'],
                event: 'downloadXml'
            },
            {
                id:'show-highlight',
                index: 33,
                toggle:true,
                active:true,
                icon:'icon-font',
                title:'Show editor word highlight',
                modes:['page'],
                event: 'toggleShowHighlight'
            },
            {
                id:'back',
                index: 3,
                toggle: false,
                icon: 'icon-backward',
                title: 'Go back to the collection',
                modes:['page'],
                event: 'goBackToCollection'
            },
            {
                id:'zoom-in',
                index: 11,
                toggle:false,
                icon:'icon-zoom-in',
                title:'Zoom in',
                modes:['page'],
                event:'zoomIn'
            },

            {
                id:'zoom-out',
                index: 12,
                toggle:false,
                icon:'icon-zoom-out',
                title:'Zoom out',
                modes:['page'],
                event:'zoomOut'
            
            },

            {
                id:'pan-zoom',
                index: 13,
                toggle:true,
                icon:'icon-move',
                title:'Mouse wheel pan/zoom',
                modes:['page'],
                event:'panZoom'
            },

            {
                id:'layout-selector',
                index: 52,
                toggle:true,
                active: false,
                icon:'icon-repeat',
                title:'Horizontal / vertical layout',
                modes:['page'],
                event:'changeLayout'
            },
            {
                id:"save",
                index: 62,
                toggle:false,
                text:"Save",
                title:"Save",
                modes:["page"],
                event: 'saveDocument'
            },
            {
                id:'toggle-linebreaks',
                index: 21,
                toggle:true,
                active:true,
                icon:'icon-align-left',
                title:'Line break after each text line',
                modes:['page'],
                event:'toggleLineBreak'
            },

            {
                id:'highlight-editor-word',
                index: 22,
                toggle:true,
                active:false,
                icon:'icon-star',
                title:'Highlight word under cursor in editor',
                modes:['page'],
                event:'highlightEditorWord'
            },

            {
                id:'show-saved-changes',
                index: 23,
                toggle:true,
                active:true,
                icon:'icon-check',
                title:'Show unsaved changes',
                modes:['page'],
                event:'showSavedChanges'
            },

            {
                id:'show-original-changes',
                index: 24,
                toggle:true,
                active:true,
                icon:'icon-edit',
                title:'Show changes made to original',
                modes:['page'],
                event:'showOriginalChanges'
            },

            {
                id:'show-language',
                index: 25,
                toggle:true,
                active:true,
                icon:'icon-globe',
                title:'Show language of words',
                modes:['page'],
                event:'showLanguage'
            },


        ],

        shortcuts : [

            {
                code: 113,
                modes: ['page'],
                event: 'panZoom'
            },
            {
                code: 33,
                modes: ['page'],
                event: 'pagePrevious'
            },

            {
                code: 34,
                modes: ['page'],
                event: 'pageNext'
            },
        ],
        "selected_language": "fi",
        "languages": [
            {
                "code":"liv",
                "name": "Livonian",
                "keyboard": livkbd
            },
            {
                "code":"fi",
                "name":"Finnish",
                "keyboard":lkbd
            },
            {
                "code":"ers",
                "name":"Erzya",
                "keyboard":kkbd
            },
            {
                "code":"moks",
                "name":"Moksha",
                "keyboard":kkbd
            },
            {
                "code":"veps",
                "name":"Veps",
                "keyboard":lkbd
            },
            {
                "code":"ingrian",
                "name":"Ingrian",
                "keyboard":lkbd
            },
            {
                "code":"meadowmari",
                "name":"Meadow Mari",
                "keyboard":kkbd
            },
            {
                "code":"hillmari",
                "name":"Hill Mari",
                "keyboard":kkbd
            },
            {
                "code":"ru",
                "name":"Russian",
                "keyboard":kkbd
            },
            {
                "code": "oldfi",
                "name": "Old Literary Finnish",
                "keyboard": lkbd
            },
            {
                "code": "la",
                "name": "Latin",
                "keyboard": latinkbd
            }
        ],
        "urls": {
            "docBase": '/api/id/<id>/pages/'
        }
    };

});
