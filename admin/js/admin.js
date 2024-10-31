Array.prototype.remove = function () {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

if (!('remove' in Element.prototype)) {
    Element.prototype.remove = function () {
        if (this.parentNode) {
            this.parentNode.removeChild(this);
        }
    };
}

function regexIndexOf(string, regex, startpos) {
    var indexOf = string.substring(startpos || 0).search(regex);
    return (indexOf >= 0) ? (indexOf + (startpos || 0)) : indexOf;
}

function isFunction(functionToCheck) {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}

Node.prototype.appear = function(anim = "fade",appearTime){

    if(anim.includes("slide")){
        var heightContainer = this.offsetHeight;
        this.style.height = '0';
    }
    if(anim.includes("fade")){
        this.style.opacity = '0';
    }
    if(anim.includes("popY")){
        this.style.transform = 'scaleY(0.6)';
    }
    if(anim.includes("pop")){
        this.style.transform = 'scale(0.6)';
    }

    setTimeout(()=>{
        if(anim.includes("slide")){
            this.style.height = heightContainer + 'px';
        }
        if(anim.includes("fade")){
            this.style.opacity = '1';
        }
        if(anim.includes("popY")){
            this.style.transform = 'scaleY(1)';
        }
        setTimeout(()=>{
            if(anim.includes("slide")){
                this.style.height = null;
            }
            if(anim.includes("fade")){
                this.style.opacity = null;
            }
            if(anim.includes("popY")){
                this.style.transform = null;
            }
            if(anim.includes("pop")){
                this.style.transform = null;
            }
            this.setAttribute('appear-anim', anim);
        },appearTime);
    },0);
}

Node.prototype.disappear = function(callback, disappearTime){

    let anim = this.getAttribute('appear-anim');
    if(anim.includes("fade")){
        this.style.opacity = '1';
    }
    if(anim.includes("slide")){
        this.style.height = this.offsetHeight + 'px';
    }
    if(anim.includes("popY")){
        this.style.transform = 'scaleY(1)';
    }
    if(anim.includes("pop")){
        this.style.transform = 'scale(1)';
    }
    setTimeout(()=>{
        if(anim.includes("fade")){
            this.style.opacity = '0';
        }
        if(anim.includes("slide")){
            this.style.height = '0';
        }
        if(anim.includes("popY")){
            this.style.transform = 'scaleY(0.6)';
        }
        if(anim.includes("pop")){
            this.style.transform = 'scale(0.6)';
        }
        setTimeout(()=>{
            if(anim.includes("fade")){
                this.style.opacity = null;
            }
            if(anim.includes("slide")){
                this.style.height = null;
            }
            if(anim.includes("popY")){
                this.style.transform = null;
            }
            if(anim.includes("pop")){
                this.style.transform = null;
            }
            this.removeAttribute('appear-anim');
            callback();
        },disappearTime);
    });
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

String.prototype.nbOccu = function (motif) {
    return this.split(motif).length - 1;
}

function debounce(callback, delay) {
    var timer = null;
    return function(){
        clearTimeout(timer);
        timer = setTimeout(function(){
            callback();
        }, delay);
    }
}

function numberWithSpaces(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

var decodeEntities = (function() {
    var element = document.createElement('div');

    function decodeHTMLEntities (str) {
    if(str && typeof str === 'string') {
        str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
        str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
        element.innerHTML = str;
        str = element.textContent;
        element.textContent = '';
    }

    return str;
    }

    return decodeHTMLEntities;
})();

function aroundInt(number, precision) {
    return Math.round(number * (1 / precision)) / (1 / precision);
}


function selectOneAmongOthers(elem, listElem, selectClass = "active") {
    listElem.forEach(el => el.classList.remove(selectClass));
    if(Array.isArray(elem)){
        for (let i = 0; i < elem.length; i++) {
            if (elem[i] !== undefined) { elem[i].classList.add(selectClass) };
        }
    }else{
        if (elem !== undefined) { elem.classList.add(selectClass) };
    }
}

function getPosition(string, subString, index) {
    return string.split(subString, index).join(subString).length;
  }

function elementsToBox(elements, box) {
    for (let i = 0; i < elements.length; i++) {
        box.appendChild(elements[i]);
    }
}

function zoomCadre(parentContainer) {
    var positionCursor = parentContainer.getAttribute('position');
    var maxPosition = parentContainer.querySelector('.input-range').getAttribute('max');
    var cadreScreen = document.getElementById('cadre-screen');

    cadreScreen.style.transform = 'scale(' + positionCursor * maxPosition / '100' + ')';
}

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

String.prototype.replaceArray = function(find, replace) {
    var replaceString = String(this);
    for (var i = 0; i < find.length; i++) {
        while(replaceString.includes(find[i])){
            replaceString = replaceString.replace(find[i], replace);
        }
    }
    return replaceString;
};

function slideUp(elem, transitionDuration){

    var height = elem.clientHeight + parseInt(window.getComputedStyle(elem).getPropertyValue('border-top-width'), 10) + parseInt(window.getComputedStyle(elem).getPropertyValue('border-bottom-width'), 10) + 'px';

    elem.style.overflow = 'hidden';
    elem.style.height = height;
    elem.style.transitionDuration = transitionDuration + "ms";

    setTimeout(function(){
        elem.style.height = '0px';

        setTimeout(() => {
            elem.classList.remove('slide-open');
            elem.style.overflow = null;
            elem.style.display = 'none';
            elem.style.transitionDuration = null;
            elem.style.height = null;
        }, transitionDuration);
    },0);

}

function slideDown(elem, transitionDuration){

    elem.classList.add('slide-open');
    elem.style.display = 'block';
    elem.style.height = 'auto';
    elem.style.overflow = 'hidden';
    elem.style.transitionDuration = transitionDuration + "ms";

    var height = elem.clientHeight + parseInt(window.getComputedStyle(elem).getPropertyValue('border-top-width'), 10) + parseInt(window.getComputedStyle(elem).getPropertyValue('border-bottom-width'), 10) + 'px';

    elem.style.height = '0px';

    setTimeout(function () {
        elem.style.height = height;
        setTimeout(() => {
            elem.style.overflow = null;
            elem.style.transitionDuration = null;
            elem.style.height = null;
        }, transitionDuration);
    }, 0);
}

function slideToggle(elem, transitionDuration){

    if (!elem.classList.contains('slide-open')) {
        slideDown(elem, transitionDuration);      
    } else {
        slideUp(elem, transitionDuration);
    }
}
TransitionDuration.prototype = {
    constructor: TransitionDuration,
    getPropertyTimeValue: function(css, property){
        var time = false;

            if(css.indexOf(property) !== -1){
            var trDelay = css.slice(css.indexOf(property + ':') + (property + ':').length );
            trDelay = trDelay.slice(0, trDelay.indexOf('ms;'));
            time = parseInt(trDelay, 10);
        }
        if(time === false){
            if(property === "transition-duration"){
                time = 1000;
            }else{
                time = 0;
            }
        }
        return time;
    },
    getTransitionDuration: function(css){

            css = this.convertToMilliSecond(css);
        var layersCss = css.split(/\#[a-zA-Z]+\{/);
        layersCss = layersCss.filter( function(el){ return el !== "" } );
        var durations = [];

            for (let i = 0; i < layersCss.length; i++) {
            var duration = 0;
            duration += this.getPropertyTimeValue(layersCss[i], 'transition-duration');
            duration += this.getPropertyTimeValue(layersCss[i], 'transition-delay');
            durations.push(duration);
        }

            return Math.max.apply(null, durations);
    },
    convertToMilliSecond: function(css){
        var properties = css.split(';');

            for (let i = 0; i < properties.length; i++) {
            const property = properties[i];
            if(property.indexOf(':') !== -1 && property.split(':').length === 2){
                var propertyName = property.split(':')[0];
                var propertyValue = property.split(':')[1];
                if(propertyValue.match(/[0-9]\s*s\s*$/) !== null){
                    var numericValue = propertyValue.replace('s', '').trim();
                    numericValue = numericValue * 100;
                    propertyValue = numericValue + "ms";
                    properties[i] = propertyName + ":" + propertyValue;
                }
            }
        }

            return properties.join(';');
    },
    getInDuration: function(){
        if(this.transitionData !== null ){
            var inStyle = '';
            var intTransition = this.transitionData.transition ;

            if( intTransition !== null && intTransition.overlay !== "" && intTransition.overlay !== false ){
                inStyle += JSON.parse(intTransition.overlay).css.in.time;
            }
            if( intTransition !== null && intTransition.page !== "" && intTransition.page !== false ){
                inStyle += '#page{' + JSON.parse(intTransition.page).in;
            }
            return this.getTransitionDuration(inStyle);            
        }
    },
    getOutDuration: function(){
        if(this.transitionData !== null){
            var outStyle = '';
            var outTransition = this.transitionData.transition ;

            if(outTransition !== null){
                if( outTransition !== null && outTransition.overlay !== "" && outTransition.overlay !== false ){
                    outStyle += JSON.parse(outTransition.overlay).css.out.time;
                }
                if( outTransition !== null && outTransition.overlay !== "" && outTransition.page !== false ){
                    outStyle += '#page{' + JSON.parse(outTransition.page).out;
                }
                return this.getTransitionDuration(outStyle);
            }

        }
    },
}

function TransitionDuration(transition){
    this.transitionData = transition;
}
PageSelectorSetup.prototype = {
    constructor: PageSelectorSetup,
    findPageContainer: function(pageContainer){
        this.adaptDom();
        return this.searchPageContainer(pageContainer);
    },
    adaptDom: function(){
        if(this.iframe.contentWindow.document.head.querySelector('#wppatr-style') !== null){
            this.iframe.contentWindow.document.head.querySelector('#wppatr-style').remove();            
        }
        if(this.iframe.contentWindow.document.body.querySelector('#transition-container') !== null){
            this.iframe.contentWindow.document.body.querySelector('#transition-container').style.pointerEvents = "none";            
        }
        if(this.iframe.contentWindow.document.body !== null){
            this.iframe.contentWindow.document.body.classList.add('wppatr-cancel-transition');            
        }
    },
    searchPageContainer: function(pageContainer){
        var frame = this.iframe.contentWindow.document;

            var ancestors = pageContainer === undefined ? undefined : pageContainer;
        frame.addEventListener('click', getPath = (e)=>{
            e.preventDefault();
            if(ancestors === undefined){
                ancestors = e.path.splice(0, e.path.length - 3).map(el => this.getPageSelector(el));
            }else{
                var el = e.target;
                while( !ancestors.includes( this.getPageSelector(el) ) && el.tagName !== 'BODY' && el.tagName !== 'HTML' && el.tagName !== undefined ){
                    el = el.parentNode;
                }
                el = this.getPageSelector(el);
                ancestors = ancestors.slice(ancestors.indexOf(el));
            }
        });

            var widthSection = frame.documentElement.clientWidth / 3;
        var heightSection = frame.documentElement.clientHeight / 3;
        var heightAdminBar = frame.querySelector('#wpadminbar') !== null ? frame.querySelector('#wpadminbar').offsetHeight : 0 ;
        var xCoors = [1, widthSection, 2 * widthSection, 2.8 * widthSection];
        var yCoors = [heightAdminBar + 1, heightSection, 2 * heightSection, 2.8 * heightSection];

            try {
            for(const x of xCoors){
                for(const y of yCoors){
                    if(frame.elementFromPoint(x, y) !== null && frame.elementFromPoint(x, y) !== undefined){
                        frame.elementFromPoint(x, y).click();
                    }
                }
            }            
        } catch (error) {
            console.log(error);
        }

            frame.removeEventListener('click', getPath);
        return ancestors;
    },
    getPageSelector: function(pageContainer){
        var queryPageContainer;

            if(pageContainer.hasAttribute('id')){
            queryPageContainer = '#' + pageContainer.id;
        }else if(pageContainer.tagName === "BODY"){
            queryPageContainer = 'body';
        }else if(pageContainer.hasAttribute('class')){
            queryPageContainer = '.' + pageContainer.className.split(' ').join('.');
        }

            return queryPageContainer;
    },
    getPageLink: function(){
        var frame = this.iframe;
        var pageLink = undefined;
        var links = frame.contentWindow.document.querySelectorAll('a');
        var i = 0;

            while( pageLink === undefined && i < links.length ){
            if( links[i].closest('#wpadminbar') === null && !links[i].getAttribute('href').includes('/wp-admin') && links[i].hasAttribute('href') && links[i].getAttribute('href') !== frame.getAttribute('src') && !links[i].getAttribute('href').includes('#') ){
                pageLink = links[i];
            }
            i++;
        }
        return pageLink;
    },
    isFunction: function(functionToCheck) {
        return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
    },
    checkIsConfigTheme: function(currentThemes){
        var currentTheme = currentThemes[1] === "" ? currentThemes[0] : currentThemes[1];
        var containerSelector = false;

        switch (currentTheme) {
            case 'Divi':
                containerSelector = '#page-container';
                break;
            case 'Astra':
                containerSelector = '#page';
                break;
            case 'Ultra':
                containerSelector = '#pagewrap';
                break;
            case 'Avada':
                containerSelector = '#wrapper';
                break;
            case 'Twenty Twenty-One':
                containerSelector = '#page';
                break;
        }

        return containerSelector;
    }
}

function PageSelectorSetup(currentThemes, callback){

        this.callback = callback;
    this.pageContainer = this.checkIsConfigTheme(currentThemes);
    if(this.pageContainer !== false){
        setTimeout(()=>{
            if( this.isFunction(this.callback) ){
                this.callback(this.pageContainer);
            }
        },0);
    }else{
        this.iframe = document.getElementById('wppatr-simulated-website');
        this.pageContainer = undefined;

        this.iframe.addEventListener('load', firstLoad = ()=>{
            this.pageContainer = this.findPageContainer(this.pageContainer);
            this.iframe.removeEventListener('load', firstLoad);

            var pageLink = this.getPageLink();
            pageLink.click();

            this.iframe.addEventListener('load', secondLoad = ()=>{
                this.pageContainer = this.findPageContainer(this.pageContainer);
                this.iframe.removeEventListener('load', secondLoad);

                this.pageContainer = this.pageContainer[0];
                if( this.isFunction(this.callback) ){
                    this.callback(this.pageContainer);
                }
            });
        });        
    }
}

BasicBuilder.prototype = {
    init: function(){
        this.tabs();
        this.switcherSetup();
        this.radioSelectorSetup();
        this.saveSetup();
        this.calculatePageSelectorSetup();
        this.checkPageSelector();
    },
    tabs: function(){

            var bb = this.bb;

        bb.addEventListener('click', (e)=>{
            if(e.target.closest("[tab-type=button][tab-family][tab-link]") !== null){
                var tabBtn = e.target.closest("[tab-type=button][tab-family][tab-link]");
                var tabBtnsFamily = bb.querySelectorAll('[tab-type=button][tab-family=' + tabBtn.getAttribute('tab-family') + ']');
                var tabFamily = bb.querySelectorAll('[tab-type=tab][tab-family=' + tabBtn.getAttribute('tab-family') + ']');
                var linkedTab = bb.querySelector('[tab-type=tab][tab-family=' + tabBtn.getAttribute('tab-family') + '][tab-link=' + tabBtn.getAttribute('tab-link') + ']');

                                selectOneAmongOthers(tabBtn, tabBtnsFamily);
                selectOneAmongOthers(linkedTab, tabFamily);
            }
        });
    },
    saveSetup: function(){

        document.addEventListener('keydown', (e)=>{
            if(e.ctrlKey && e.which === 83){
                e.preventDefault();
                this.save();
            }
        });

        var saveBtns = document.querySelectorAll('.save-transition-form-btn');
        for (let i = 0; i < saveBtns.length; i++) {
            const saveBtn = saveBtns[i];
            saveBtn.addEventListener('click', (e)=>{
                e.preventDefault();
                this.save();
            });
        }

    },
    switcherSetup: function(){
        document.addEventListener('click', (e)=>{
            if(e.target.closest('.switch, .switch-power') !== null){
                var switcher = e.target.closest('.switch, .switch-power');

                var input = switcher.querySelector('input');
                if(input.value === "0"){
                    input.value = '1';
                    if(switcher.closest('.element-tl') !== null){
                        switcher.closest('.element-tl').classList.remove('disabled');
                    }
                }else{
                    input.value = '0';
                    if(switcher.closest('.element-tl') !== null){
                        switcher.closest('.element-tl').classList.add('disabled');
                    }
                }
                switcher.querySelector('input').dispatchEvent(new Event('input'));

                if(input.closest('.element-tl') !== null){
                    document.dispatchEvent(new CustomEvent('activElement', {
                        detail:{
                            state: input.value,
                            element: input.closest('[editeur]').getAttribute('editeur')
                        }
                    }));
                }
            }
        });
    },
    radioSelectorSetup: function(){

        var allRadioSelectors = document.querySelectorAll('[radio-selector]');

        for(const allRadioSelector of allRadioSelectors){
            if(allRadioSelector.querySelector('[radio-unit].active') === null){
                allRadioSelector.querySelector('[radio-unit]').classList.add('active');
            }
        }

        window.addEventListener('click', (e)=>{
            if( e.target.closest('[radio-unit]') !== null && e.target.closest('[radio-selector]') !== null ){
                this.selectRadio(e.target.closest('[radio-unit]'));
            }
        });

    },
    selectRadio: function(el){
        var neighbors = el.closest('[radio-selector]').querySelectorAll('[radio-unit]');
        var elData = el.querySelectorAll('input');
        var datas = el.closest('[radio-selector]').querySelectorAll('[radio-data] input');

        selectOneAmongOthers(el, neighbors);
        for (let i = 0; i < datas.length; i++) {
            datas[i].value = elData[i].value;
        }

            },
    calculatePageSelectorSetup: function(){
        var pageSelectorSeekerBtn = document.getElementById('calculate-page-selector');
        var searchIsRunning = null;

        pageSelectorSeekerBtn.addEventListener('click', ()=>{
            var seekerPageSelector = document.createElement('iframe');
            seekerPageSelector.id = "wppatr-simulated-website";
            seekerPageSelector.setAttribute('src', WPPATR_Localize_Url.getHomeUrl);
            seekerPageSelector.setAttribute('frameborder', "0");
            seekerPageSelector.style = "position:absolute;top:0;left:0;width:100%;height:100%;z-index:-99999999;pointer-events:none;opacity:0;";

                        if(searchIsRunning === null){
                searchIsRunning = true;
                document.body.appendChild(seekerPageSelector);
                pageSelectorSeekerBtn.querySelector('span').style.opacity = "0";
                pageSelectorSeekerBtn.innerHTML += "<div class='ld-container'><div class='ld-seeker-selector'><div></div><div></div><div></div><div></div></div></div>";
                var ldContainer = pageSelectorSeekerBtn.querySelector('.ld-container');
                ldContainer.style.opacity = "1";

                new PageSelectorSetup(WPPATR_Localize_Url.activeTheme, (pageSelector)=>{
                    pageSelectorSeekerBtn.parentNode.querySelector('[name="wppatr-page-selector"]').value = pageSelector;
                    seekerPageSelector.remove();
                    ldContainer.style.opacity = "0";
                    pageSelectorSeekerBtn.querySelector('span').style.opacity = "1";
                    searchIsRunning = setTimeout(() => {
                        var pageSelectorInput = document.querySelector('[name="wppatr-page-selector"]');
                        if(pageSelectorInput.hasAttribute('saving-error')){
                            pageSelectorInput.removeAttribute('saving-error');
                        }
                        if(pageSelectorInput.hasAttribute('help-text')){
                            pageSelectorInput.removeAttribute('help-text');
                        }
                        if(pageSelectorInput.classList.contains('component-error')){
                            pageSelectorInput.classList.remove('component-error');
                        }
                        ldContainer.remove();
                        searchIsRunning = null;
                    }, 300);
                });
            }

        });
    },
    checkPageSelector: function(){
        var pageSelectorInput = document.querySelector('[name="wppatr-page-selector"]');
        var pageSelectorSeekerBtn = document.getElementById('calculate-page-selector');
        var checkIsRunning = null;
        var ldContainer;


                var oncePageSelectorFilled = debounce(()=>{
            if(checkIsRunning === null){
                checkIsRunning = true;
                var seekerPageSelector = document.createElement('iframe');
                seekerPageSelector.setAttribute('src', WPPATR_Localize_Url.getHomeUrl);
                seekerPageSelector.setAttribute('frameborder', "0");
                seekerPageSelector.style = "position:absolute;top:0;left:0;width:100%;height:100%;z-index:-99999999;pointer-events:none;opacity:0;";
                document.body.appendChild(seekerPageSelector);

                seekerPageSelector.addEventListener('load', onceSeekerLoaded = ()=>{
                    var hasErrors = false;
                    try {
                        seekerPageSelector.contentWindow.document.querySelector( pageSelectorInput.value )
                    } catch (error) {
                        hasErrors = true;
                    }

                    if( !hasErrors && seekerPageSelector.contentWindow.document.querySelector( pageSelectorInput.value ) === null){
                        pageSelectorInput.setAttribute('help-text', 'Your page selector doesn\'t exist on your website.');
                        if( !pageSelectorInput.hasAttribute('saving-error') ){
                            pageSelectorInput.setAttribute('saving-error', '');
                        }
                        pageSelectorInput.classList.add('component-error');
                    }else{
                        if(pageSelectorInput.hasAttribute('saving-error')){
                            pageSelectorInput.removeAttribute('saving-error');
                        }
                        if(pageSelectorInput.hasAttribute('help-text')){
                            pageSelectorInput.removeAttribute('help-text');
                        }
                        if(pageSelectorInput.classList.contains('component-error')){
                            pageSelectorInput.classList.remove('component-error');
                        }
                    }

                        seekerPageSelector.remove();
                    ldContainer.style.opacity = "0";
                    pageSelectorSeekerBtn.querySelector('span').style.opacity = "1";
                    ldContainer.remove();
                    checkIsRunning = setTimeout(() => {
                        ldContainer.remove();
                        seekerPageSelector.removeEventListener('load', onceSeekerLoaded);
                        checkIsRunning = null;
                    }, 300);
                });
            }
        }, 1000);

        pageSelectorInput.addEventListener('input', oncePageSelectorFilled);

                pageSelectorInput.addEventListener('input', ()=>{
            pageSelectorInput.setAttribute('saving-error', '');
            if(pageSelectorSeekerBtn.querySelector('.ld-container .ld-seeker-selector') === null){
                pageSelectorSeekerBtn.innerHTML += "<div class='ld-container'><div class='ld-seeker-selector'><div></div><div></div><div></div><div></div></div></div>";
                ldContainer = pageSelectorSeekerBtn.querySelector('.ld-container');
                setTimeout(() => {
                    pageSelectorSeekerBtn.querySelector('span').style.opacity = "0";
                    ldContainer.style.opacity = "1";
                }, 0);
            }
        });

    },
    save: function(){

        if(document.querySelector('[saving-error]') === null){

            var options_fromform = jQuery('#form-builder').serialize();

            var ajaxData = new FormData;
            ajaxData.append('action', 'wppatrnonce_save_options');
            ajaxData.append('value', options_fromform);
            ajaxData.append('nonce', document.getElementById('wppatr-nonce').value );

            jQuery.ajax({
                method: "POST",
                url: WPPATR_Localize_Url.ajaxUrl,
                data: ajaxData,
                processData:false,
                contentType:false,
                beforeSend: function ( xhr ){
                    jQuery("#animation-backup").removeAttr('class').fadeIn('fast');
                },
                success: function(response){

                                        setTimeout(function(){
                        jQuery("#animation-backup").addClass('success-animation');
                    }, 300);

                    setTimeout(function(){
                        jQuery("#animation-backup").fadeOut();
                    },500);
                }
            });            
        }

    },
}

function BasicBuilder(){
    this.bb = document.getElementById('basic-builder');
    this.init();
}

document.addEventListener('DOMContentLoaded', ()=>{
    new BasicBuilder();
});
