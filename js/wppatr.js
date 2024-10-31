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
function PageTransition(t){this.transition={pageSelector:"body",inDuration:200,outDuration:200,links:"a",notLinks:"",removeScrollBar:"0"},this.page=null,this.transitionContainer=null,this.transitionContainerChild=null,this.notice=document.getElementById("flint-notice"),t&&Object.deepExtend(this.transition,t),this.page=null===document.querySelector(this.transition.pageSelector)?document.body:document.querySelector(this.transition.pageSelector),this.transitionContainer=document.getElementById("transition-container"),null!==this.transitionContainer&&(this.transitionContainerChild=this.transitionContainer.querySelectorAll("*"),this.init())}Object.deepExtend=function(t,i){for(var n in i)i[n]&&i[n].constructor&&i[n].constructor===Object?(t[n]=t[n]||{},arguments.callee(t[n],i[n])):t[n]=i[n];return t},PageTransition.prototype={constructor:PageTransition,isIE:function(){return window.navigator.userAgent.indexOf("MSIE ")>0||!!navigator.userAgent.match(/Trident.*rv\:11\./)},triggerIn:function(){this.transitionContainer.classList.remove("init"),this.transitionContainer.classList.add("page-loaded"),this.page.classList.add("page-loaded"),document.body.classList.add("page-loaded")},setRestSetup:function(){document.body.classList.remove("scroll-block"),document.getElementById("loader-setup").classList.add("paused"),window.dispatchEvent(new Event("resize")),this.transitionContainer.style.display="none"},isPageSelectorComputer:function(){return document.body.classList.contains("wppatr-cancel-transition")},initOut:function(){for(let t=0;t<this.transitionContainerChild.length;t++)this.isIE()?this.transitionContainerChild[t].removeAttribute("style"):(this.transitionContainerChild[t].style.transitionDuration="0s",this.transitionContainerChild[t].style.transitionDelay="0s");this.transitionContainer.style.display=null,this.transitionContainer.classList.remove("init-time"),this.transitionContainer.classList.remove("page-loaded"),this.page.classList.remove("page-loaded"),document.body.classList.remove("page-loaded"),"1"===this.transition.removeScrollBar&&document.body.classList.add("scroll-block"),this.transitionContainer.classList.add("change-page"),this.transitionContainer.classList.add("change-page-time"),this.page.classList.add("change-page")},triggerOut:function(){for(let t=0;t<this.transitionContainerChild.length;t++)this.transitionContainerChild[t].style.transitionDuration=null,this.transitionContainerChild[t].style.transitionDelay=null;this.transitionContainer.classList.remove("change-page"),this.transitionContainer.classList.add("new-page")},noticeExist:function(){return null!==document.getElementById("flint-notice")},noticeIsVisible:function(){if(this.noticeExist()){var t=document.getElementById("flint-notice"),i=window.innerWidth-(20+t.getBoundingClientRect().width/2),n=20+t.getBoundingClientRect().height/2;return t.contains(document.elementFromPoint(i,n))}},createNotice:function(){if(!this.noticeExist()){var t=document.createElement("div");t.id="flint-notice",t.style="display:block !important;opacity:1 !important;position:fixed !important;bottom:20px !important;right:20px !important;z-index:999999999999999999999999999999999999999999999999999999999999 !important;",t.innerHTML='Transition created by <a href="https://fluent-interface.com/">Fluent Interface</a>',document.querySelector("html").appendChild(t),this.notice=t}},moveNotice:function(){if(this.noticeExist){var t=document.getElementById("flint-notice");document.querySelector("html").appendChild(t)}},loadNextPage:function(t){setTimeout((function(){window.location=t,document.getElementById("loader-setup").classList.remove("paused")}),this.transition.outDuration)},init:function(){var t=this,i=t.transition;setTimeout((function(){var n=null;if(t.noticeExist()?t.moveNotice():t.createNotice(),t.noticeIsVisible()&&(t.triggerIn(),setTimeout((function(){t.setRestSetup(),n=setTimeout((function(){t.notice.style.setProperty("display","none","important")}),2e3)}),i.inDuration),!t.isPageSelectorComputer())){i.links=""===i.links?"a":i.links;var e=""===i.notLinks?i.links:i.links+":not("+i.notLinks+")",o=document.querySelectorAll(e);for(let i=0;i<o.length;i++){const e=o[i];e.addEventListener("click",(function(i){if(clearTimeout(n),t.notice.style.setProperty("display","block","important"),t.noticeExist()?t.moveNotice():t.createNotice(),t.noticeIsVisible()){var o=e.getAttribute("href");-1===o.indexOf("#")&&(i.preventDefault(),t.initOut(),setTimeout((function(){t.triggerOut(),t.loadNextPage(o)}),0))}}))}}}),0)}};
if(Transition.transition !== null && Transition.active === '1'){
    var TransitionDurations = new TransitionDuration(Transition);

    new PageTransition({
        inDuration : TransitionDurations.getInDuration(),
        outDuration : TransitionDurations.getOutDuration(),
        pageSelector : Transition.pageContainer,
        links: Transition.links,
        notLinks: Transition.notLinks,
        removeScrollBar: Transition.removeScrollBar,
    });    
}else{
    document.querySelector('.scroll-block').classList.remove('scroll-block');
}