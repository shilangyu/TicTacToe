(()=>{"use strict";var t={336:function(t,e,n){var r=this&&this.__spreadArray||function(t,e,n){if(n||2===arguments.length)for(var r,i=0,o=e.length;i<o;i++)!r&&i in e||(r||(r=Array.prototype.slice.call(e,0,i)),r[i]=e[i]);return t.concat(r||Array.prototype.slice.call(e))};Object.defineProperty(e,"__esModule",{value:!0});var i=n(949),o=function(){function t(t,e,n,r){void 0===n&&(n=0),void 0===r&&(r={AI:"○",player:"×"}),this.width=t,this.height=e,this.signs=r,this.tiles=new Array(e).fill(null).map((function(){return new Array(t).fill(null)})),this.turn=n}return Object.defineProperty(t.prototype,"full",{get:function(){return this.tiles.every((function(t){return t.every((function(t){return null!==t}))}))},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"stringified",{get:function(){return this.tiles.map((function(t){return t.map((function(t){return t}))})).reduce((function(t,e){return r(r([],t,!0),e,!0)}),[]).map(String).join("")},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"rotations",{get:function(){var e=new t(3,3);e.tiles=this.tiles.map((function(t){return t.map((function(t){return t}))}));for(var n=this.tiles.map((function(t){return t.map((function(t){return t}))})),r=[],o=0;o<4;o++)e.tiles=(0,i.rotate)(n,o),r.push(e.stringified);return r},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"mirrors",{get:function(){var e=new t(3,3);e.tiles=this.tiles.map((function(t){return t.map((function(t){return t}))}));for(var n=this.tiles.map((function(t){return t.map((function(t){return t}))})),r=[],o=0;o<4;o++)e.tiles=(0,i.mirror)(n,o),r.push(e.stringified);return r},enumerable:!1,configurable:!0}),t.prototype.playerMove=function(t,e){return this.move(t,e,0),0===this.win()},t.prototype.aiMove=function(t,e){return this.move(t,e,1),1===this.win()},t.prototype.move=function(t,e,n){this.tiles[t][e]=n,this.toggleTurn()},t.prototype.toggleTurn=function(){null!==this.win()||this.full?this.turn=null:this.turn=this.turn?0:1},t.prototype.win=function(){for(var t,e=!0,n=0,r=this.tiles;n<r.length;n++){var i=r[n];if(e=!0,null!==(t=i[0])){for(var o=0,a=i;o<a.length;o++)if(a[o]!==t){e=!1;break}if(e)return t}}for(var u=0;u<this.tiles.length;u++)if(e=!0,null!==(t=this.tiles[0][u])){for(var s=0;s<this.tiles[u].length;s++)if(this.tiles[s][u]!==t){e=!1;break}if(e)return t}if(e=!0,null!==(t=this.tiles[0][0])){for(u=0;u<this.tiles.length;u++)if(this.tiles[u][u]!==t){e=!1;break}if(e)return t}if(e=!0,null!==(t=this.tiles[0][2])){for(u=0;u<this.tiles.length;u++)if(this.tiles[u][2-u]!==t){e=!1;break}if(e)return t}return null},t}();e.default=o},102:function(t,e,n){var r=this&&this.__spreadArray||function(t,e,n){if(n||2===arguments.length)for(var r,i=0,o=e.length;i<o;i++)!r&&i in e||(r||(r=Array.prototype.slice.call(e,0,i)),r[i]=e[i]);return t.concat(r||Array.prototype.slice.call(e))};Object.defineProperty(e,"__esModule",{value:!0});var i=n(949),o=function(){function t(){this.brain={}}return t.prototype.mappedDecisions=function(t,e){for(var n=0,o=0,a=r(r([],t,!0),e,!0);o<a.length;o++){var u=a[o];if(u in this.brain)return this.brain[u].map((function(t){var e=(0,i.mapxy)(t.x,t.y,n%4,n<4?"rotation":"mirror");return{x:e[0],y:e[1],fitness:t.fitness}}));n++}return[]},t.prototype.decide=function(t,e){var n=this.mappedDecisions(t,e);return n.length?n[Math.floor(Math.random()*n.length)]:(this.createMoves(t[0]),this.decide(t,e))},t.prototype.createMoves=function(t){this.brain[t]=[];var e=this.brain[t],n=t.replace(/[10]/g,"    ");if(n.includes("null"))do{var r=n.lastIndexOf("null")/4;e.push({x:Math.floor(r/3),y:r%3,fitness:100}),n=n.replace(/null( *)$/,"    $1")}while(n.includes("null"))},t}();e.default=o},949:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.unmapxy=e.mapxy=e.mirror=e.rotate=void 0,e.rotate=function(t,n){return t.map((function(t){return t.map((function(t){return t}))})).map((function(r,i){return r.map((function(r,o){var a=(0,e.mapxy)(i,o,n,"rotation"),u=a[0],s=a[1];return t[u][s]}))}))},e.mirror=function(t,e){var n,r=t.map((function(t){return t.map((function(t){return t}))}));switch(e){case 0:n=function(e,n){return r[t.length-n-1][t[e].length-e-1]};break;case 1:n=function(t,e){return r[e][t]};break;case 2:n=function(e,n){return r[e][t[e].length-n-1]};break;case 3:n=function(e,n){return r[t.length-e-1][n]}}return t.map((function(t,e){return t.map((function(t,r){return n(e,r)}))}))},e.mapxy=function(t,e,n,r){if("rotation"===r){t-=1,e-=1;var i=Math.PI/2*n,o=Math.cos(i),a=Math.sin(i);return[Math.round(t*o-e*a)+1,Math.round(t*a+e*o)+1]}switch(n){case 0:return[2-e,2-t];case 1:return[e,t];case 2:return[t,2-e];case 3:return[2-t,e]}return[1]},e.unmapxy=function(t,n,r,i){return"rotation"===i&&(r=4-r),(0,e.mapxy)(t,n,r,i)}},511:function(t,e,n){var r=this&&this.__awaiter||function(t,e,n,r){return new(n||(n=Promise))((function(i,o){function a(t){try{s(r.next(t))}catch(t){o(t)}}function u(t){try{s(r.throw(t))}catch(t){o(t)}}function s(t){var e;t.done?i(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(a,u)}s((r=r.apply(t,e||[])).next())}))},i=this&&this.__generator||function(t,e){var n,r,i,o,a={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function u(o){return function(u){return function(o){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,r&&(i=2&o[0]?r.return:o[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,o[1])).done)return i;switch(r=0,i&&(o=[2&o[0],i.value]),o[0]){case 0:case 1:i=o;break;case 4:return a.label++,{value:o[1],done:!1};case 5:a.label++,r=o[1],o=[0];continue;case 7:o=a.ops.pop(),a.trys.pop();continue;default:if(!((i=(i=a.trys).length>0&&i[i.length-1])||6!==o[0]&&2!==o[0])){a=0;continue}if(3===o[0]&&(!i||o[1]>i[0]&&o[1]<i[3])){a.label=o[1];break}if(6===o[0]&&a.label<i[1]){a.label=i[1],i=o;break}if(i&&a.label<i[2]){a.label=i[2],a.ops.push(o);break}i[2]&&a.ops.pop(),a.trys.pop();continue}o=e.call(t,a)}catch(t){o=[6,t],r=0}finally{n=i=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,u])}}},o=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var a,u=o(n(336)),s=o(n(102)),l={scale:150,background:"#9198a3",strokes:"#ffffff",msg:document.querySelector("#msg"),restart:document.querySelector("#restart"),canvas:{ref:document.querySelector("canvas"),size:{x:450,y:450},ctx:document.querySelector("canvas").getContext("2d")},starting:function(){for(var t=Array.from(document.querySelectorAll("input[name=starting]")),e=0,n=t;e<n.length;e++)n[e].addEventListener("change",h);return function(){for(var e=0,n=t;e<n.length;e++){var r=n[e];if(r.checked)return r.value}return"player"}}(),fps:60},c=new s.default;function f(t){l.msg.innerHTML=0===t?"You won":1===t?"AI won":"Draw"}function h(){if(a=new u.default(3,3,"AI"===l.starting()?1:0),"AI"===l.starting()){var t=c.decide(a.rotations,a.mirrors),e=t.x,n=t.y;a.aiMove(e,n)}l.msg.innerHTML=""}!function(){r(this,void 0,void 0,(function(){var t;return i(this,(function(e){switch(e.label){case 0:return h(),t=c,[4,fetch("./decisions.json")];case 1:return[4,e.sent().json()];case 2:return t.brain=e.sent(),l.canvas.ref.width=l.canvas.size.x,l.canvas.ref.height=l.canvas.size.y,l.canvas.ctx.textAlign="center",l.canvas.ctx.textBaseline="middle",l.canvas.ref.addEventListener("click",(function(t){var e=t.offsetX,n=t.offsetY,r=t.target,i=r.clientHeight,o=[e/(r.clientWidth/a.width),n/(i/a.height)].map((function(t){return Math.floor(t)}));if(0===a.turn&&null===a.tiles[o[1]][o[0]]){var u=a.playerMove(o[1],o[0]);if(u?f(0):a.full&&f(null),!u){var s=c.decide(a.rotations,a.mirrors),l=s.x,h=s.y;a.aiMove(l,h)?f(1):a.full&&f(null)}}})),l.restart.addEventListener("click",h),[2]}}))}))}(),setInterval((function(){var t=l.scale,e=l.canvas,n=e.size,r=e.ref,i=e.ctx;i.fillStyle=l.background,i.fillRect(0,0,r.width,r.height),a.tiles.forEach((function(e,r){return e.forEach((function(e,o){var u=null===e?"":0===e?a.signs.player:a.signs.AI;i.fillStyle=l.strokes,i.font="".concat(t,"px sans-serif"),i.fillText(u,t*(o+.5),t*(r+.5)),i.lineWidth=l.scale/10,i.strokeStyle=l.strokes,i.beginPath(),i.moveTo(t*o,0),i.lineTo(t*o,n.y),i.stroke(),i.moveTo(0,t*r),i.lineTo(n.x,t*r),i.stroke()}))}))}),1e3/l.fps)}},e={};!function n(r){var i=e[r];if(void 0!==i)return i.exports;var o=e[r]={exports:{}};return t[r].call(o.exports,o,o.exports,n),o.exports}(511)})();