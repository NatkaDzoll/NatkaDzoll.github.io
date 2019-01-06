'use strict'
var cosmetic = [
{indexNum: 1, item: 'Mascara:Black', prise: 60, count: 7, url:"../img/mascara.jpg"},
{indexNum: 2, item: 'Concealer', prise: 72, count: 12, url:"../img/concealer.jpg"},
{indexNum: 1, item: 'MakeUp Kit: Concealer, Powder,Tone corrector and Buff', prise: 127, count: 3, url:"../img/makeup_kit.jpg"},
{indexNum: 2, item: 'Face cream', prise: 37, count: 11, url:"../img/cream_face.jpg"},
{indexNum: 2, item: 'Brushes Concealer', prise: 6, count: 6, url:"../img/brush_concealer.jpg"},
{indexNum: 2, item: 'Brushes Powder', prise: 5, count: 5, url:"../img/brush_powder.jpg"},
{indexNum: 2, item: 'Brushes Bronzer', prise: 4, count: 8, url:"../img/brushes_bronzer.jpg"},
{indexNum: 2, item: 'Brushes Highlighter', prise: 5, count: 9, url:"../img/brush_higtliter.jpg"},
]
ReactDOM.render(
	React.createElement(iShop,{items:cosmetic}),
document.getElementById('app')
);