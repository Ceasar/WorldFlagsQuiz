(this.webpackJsonpapp=this.webpackJsonpapp||[]).push([[0],{69:function(e,t,c){},71:function(e,t,c){},80:function(e,t,c){"use strict";c.r(t);var n,r=c(2),i=c.n(r),s=c(60),o=c.n(s),a=(c(69),c(70),c(71),c(64)),u=c(61),l=c(41),d=c.n(l),j=c(28),h=c(44),b=c(45),m=c(43),x=c(42),C=c(9);function O(e){var t=e.choices,c=e.correctChoice,n=e.selectedChoice,r=e.stem,i=e.onClickAnswer,s=null!==n;return Object(C.jsxs)("div",{className:"quiz-question",children:[Object(C.jsx)("div",{className:"quiz-question-stem",children:r}),Object(C.jsx)(x.a,{className:"quiz-answers",children:t.map((function(e){var t=null;return e.value===n&&(t="danger"),s&&e.value===c&&(t="success"),Object(C.jsx)(x.a.Item,{action:!s,variant:t,value:e.value,onClick:i,children:e.value},e.key)}))})]})}function p(e){var t=e.currentScore,c=e.selectedChoice,n=e.maxScore,r=e.onClickNext,i=Object(b.a)(e,["currentScore","selectedChoice","maxScore","onClickNext"]),s=null!==c;return Object(C.jsxs)("div",{className:"quiz",children:[Object(C.jsxs)("p",{children:[t," / ",n]}),Object(C.jsx)(O,Object(h.a)({selectedChoice:c},i)),Object(C.jsx)("div",{className:"quiz-continue",children:Object(C.jsx)(m.a,{disabled:!s,onClick:r,variant:"primary",children:"Next"})})]})}function S(e){var t=e.description,c=e.errorMessage,n=e.isStarted,r=e.loading,i=e.title,s=e.onClickStartQuiz,o=Object(b.a)(e,["description","errorMessage","isStarted","loading","title","onClickStartQuiz"]);return n?r?"Loading...":c||Object(C.jsx)(p,Object(h.a)({},o)):Object(C.jsxs)("div",{className:"quiz",children:[Object(C.jsx)("h1",{children:i}),Object(C.jsx)("p",{children:t}),Object(C.jsx)(m.a,{onClick:s,children:"Start quiz"})]})}var f=new j.ApolloClient({cache:new j.InMemoryCache,uri:"https://countries.trevorblades.com"}),v=Object(j.gql)(n||(n=Object(u.a)(["\n  {\n    countries {\n      name\n      emoji\n      code\n    }\n  }\n"])));function q(e,t){switch(t.type){case"startQuiz":case"nextQuestion":return t.question;default:return e}}function w(e,t){switch(t.type){case"startQuiz":return{currentScore:0,maxScore:0};case"chooseAnswer":return{currentScore:e.currentScore+(t.isCorrect?1:0),maxScore:e.maxScore+1};default:return e}}function g(e,t){switch(t.type){case"startQuiz":case"nextQuestion":return null;case"chooseAnswer":return t.choice;default:return e}}function k(e,t){switch(t.type){case"startQuiz":return!0;default:return e}}function z(e,t){return{isStarted:k(e.isStarted,t),question:q(e.question,t),score:w(e.score,t),selectedChoice:g(e.choice,t)}}function y(){var e=Object(r.useReducer)(z,{choice:null,isStarted:!1,question:{},score:{current:0,maxScore:0}}),t=Object(a.a)(e,2),c=t[0],n=t[1],i=Object(j.useQuery)(v,{client:f}),s=i.data,o=i.loading,u=i.error,l=function(e){var t=d.a.sampleSize(e,4),c=d.a.sample(t);return{answer:c.name,choices:t.map((function(e){return{key:e.code,value:e.name}})),stem:c.emoji}},h=Object(r.useCallback)((function(e){var t=e.target.value;n({choice:t,correctChoice:c.question.answer,isCorrect:t===c.question.answer,type:"chooseAnswer"})}),[n,c]),b=Object(r.useCallback)((function(){n({type:"nextQuestion",question:l(s.countries)})}),[s,n]),m=Object(r.useCallback)((function(){n({type:"startQuiz",question:l(s.countries)})}),[s,n]);return Object(C.jsx)(S,{choices:c.question.choices,correctChoice:c.question.answer,currentScore:c.score.currentScore,description:"Test your knowledge of world flags.",error:u,isStarted:c.isStarted,loading:o,maxScore:c.score.maxScore,selectedChoice:c.selectedChoice,stem:c.question.stem,title:"World Flags Quiz",onClickAnswer:h,onClickNext:b,onClickStartQuiz:m})}var Q=function(){return Object(C.jsx)("div",{className:"App",children:Object(C.jsx)(y,{})})},N=function(e){e&&e instanceof Function&&c.e(3).then(c.bind(null,81)).then((function(t){var c=t.getCLS,n=t.getFID,r=t.getFCP,i=t.getLCP,s=t.getTTFB;c(e),n(e),r(e),i(e),s(e)}))};o.a.render(Object(C.jsx)(i.a.StrictMode,{children:Object(C.jsx)(Q,{})}),document.getElementById("root")),N()}},[[80,1,2]]]);
//# sourceMappingURL=main.fbe0b917.chunk.js.map