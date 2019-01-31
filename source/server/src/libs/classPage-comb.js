'use strict';
const { printNodes }  = require('./utils.js');
const parse5 = require('parse5');
var flattenDeep = require('lodash/flattenDeep.js');
var flattenDepth = require('lodash/flattenDepth.js');

const ClassesLeading = (HTMLFragment)=>{
    const pfrag = parse5.parseFragment;
    const frag = pfrag(HTMLFragment).childNodes[0];
    
    let href_Arr = flattenDeep(frag.childNodes.filter(elem=>{            
                    return 'attrs' in elem && elem.attrs.filter(attr => attr.name === 'class' && attr.value === 'panel-wrapper').length > 0 
                }).map(panelWrappers => panelWrappers.childNodes)
                .map(panelChildren => {
                    return panelChildren.filter(child=>{
                        return child.tagName === 'div'
                    }).map(child=>child.childNodes)
                    .map(grandsArr=>{
                        return grandsArr.filter(child=>child.tagName === 'a')
                            .map(e=> e.attrs)
                            .map(elem_attr => {
                                return elem_attr.filter(attr=>attr.name === 'href')
                            })
                    })
                }))

    let ClassName_Arr = flattenDeep(frag.childNodes.filter(elem=>{            
                                    return 'attrs' in elem && elem.attrs.filter(attr => attr.name === 'class' 
                                                                                    && attr.value === 'panel-wrapper').length > 0
            }).map(panelWrappers => panelWrappers.childNodes)
                .map(panelChildren => {
                return panelChildren.filter(child=>child.tagName === 'div')
                                    .map(child=>child.childNodes)
                                    .map(grandsArr=>{
                                        return grandsArr.filter(child => child.tagName === 'a')                    // 1 a tag = 1 class
                                        .map(atag => atag.childNodes[0])                               // one a div inside ^)
                                        .map(div => div.childNodes[2].value.replace('\n','').trim())   // open the 3rd child inside ^
                                    })
                })
        )

    let SizeRole_Arr = flattenDepth(frag.childNodes.filter(elem=>{            
        return 'attrs' in elem && elem.attrs.filter(attr => attr.name === 'class' 
                                                        && attr.value === 'panel-wrapper').length > 0
        }).map(panelWrappers => panelWrappers.childNodes)
          .map(panelChildren => {
            return panelChildren.filter(child=>child.tagName === 'div')
                            .map(child=>child.childNodes)
                            .map(grandsArr=>{
                                return grandsArr.filter(child => child.tagName === 'a')          // 1 a tag = 1 class
                                                .map(atag => atag.childNodes[0])                               // one a div inside ^)
                                                .map(div => div.childNodes)
                                                .map(children => children.filter(child=>child.tagName==='span'))
                                                .map(filteredChildren => {
                                                    return filteredChildren.map(child=>{                                
                                                        const [{value}] = [...child.childNodes]
                                                        return value
                                                    })
                                                })
                        })
            })
        , 2)

    return href_Arr.map( ({value}, i )=>{
        const [_size, role] = SizeRole_Arr[i];
        return { 
            name: ClassName_Arr[i],
            memberSize: _size,
            role,
            _link: value
        }
    })
};

module.exports = { ClassesLeading }
