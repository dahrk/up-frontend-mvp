(this["webpackJsonpup-frontend-mvp"]=this["webpackJsonpup-frontend-mvp"]||[]).push([[0],{1038:function(n,e,t){"use strict";t.r(e);var o=t(29),c=t.n(o),i=t(599),r=t.n(i),a=(t(607),t(9)),s=t.n(a),u=t(600),l=t(111),p=(t(609),t(601)),d=t(602),f=t(16);console.log(d.calendar);var j=function(){var n=Object(o.useState)(""),e=Object(l.a)(n,2),t=e[0],c=e[1],i=Object(o.useState)(""),r=Object(l.a)(i,2),a=r[0],d=r[1],j=function(){var n=Object(u.a)(s.a.mark((function n(){var e;return s.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return console.log(JSON.stringify({title:t,notes:a})),n.next=3,fetch("/api/addPrinciple",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({title:t,notes:a})});case 3:e=n.sent,console.log(e);case 5:case"end":return n.stop()}}),n)})));return function(){return n.apply(this,arguments)}}(),h=function(n){console.log(n)};return Object(f.jsxs)("div",{className:"App",children:[Object(f.jsxs)("div",{children:[Object(f.jsx)("h4",{children:"Sick demo principles"}),Object(f.jsx)("label",{children:"Principle title"}),Object(f.jsx)("input",{type:"text",name:"principleTitle",value:t,onChange:function(n){return c(n.target.value)}}),Object(f.jsx)("label",{children:"Principle notes"}),Object(f.jsx)("input",{type:"text",name:"principleNotes",value:a,onChange:function(n){return d(n.target.value)}}),Object(f.jsx)("button",{disabled:!0,onClick:function(){return j},children:"Add Principle"})]}),Object(f.jsxs)("div",{children:[Object(f.jsx)("h4",{children:"Google Calendar Login and Authentication"}),Object(f.jsx)(p.GoogleLogin,{clientId:"165194383544-aiqotfhsn1v8tt36ljvegalvp0vhscri.apps.googleusercontent.com",buttonText:"Login",onSuccess:h,onFailure:h,cookiePolicy:"single_host_origin",scopes:"https://www.googleapis.com/auth/calendar.events.readonly https://www.googleapis.com/auth/calendar.app.created"})]})]})},h=function(n){n&&n instanceof Function&&t.e(3).then(t.bind(null,1039)).then((function(e){var t=e.getCLS,o=e.getFID,c=e.getFCP,i=e.getLCP,r=e.getTTFB;t(n),o(n),c(n),i(n),r(n)}))};r.a.render(Object(f.jsx)(c.a.StrictMode,{children:Object(f.jsx)(j,{})}),document.getElementById("root")),h()},104:function(n,e){},607:function(n,e,t){},609:function(n,e,t){},618:function(n,e){},620:function(n,e){},660:function(n,e){},662:function(n,e){},694:function(n,e){},695:function(n,e){},700:function(n,e){},702:function(n,e){},709:function(n,e){},728:function(n,e){},784:function(n,e){},795:function(n,e){function t(n){var e=new Error("Cannot find module '"+n+"'");throw e.code="MODULE_NOT_FOUND",e}t.keys=function(){return[]},t.resolve=t,n.exports=t,t.id=795}},[[1038,1,2]]]);
//# sourceMappingURL=main.75b2e3a2.chunk.js.map