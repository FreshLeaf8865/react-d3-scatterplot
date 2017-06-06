import React from 'react';
import {WIDTH, VB_WIDTH, COLORS} from './const';
import * as d3 from 'd3'

const coords = require('./coords.json');

const TOOLTIP_WIDTH = 160
const TOOLTIP_HEIGHT = 190
const TOOLTIP_IMAGE_OFFSET = 20

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            coords
        }
    }

    componentWillMount () {
        this.state.coords.map(el => {
            let distance = Math.round(el.distance * VB_WIDTH);

            if (distance > VB_WIDTH / 2){
                distance = distance - VB_WIDTH / 2;
            }

            el.distance = distance;
        });

        this.groupedPoints = {
            0: [],
            100: [],
            200: [],
            300: [],
            400: []
        };

        this.state.coords.forEach(el => {
            if (el.distance > 0 && el.distance < 100) {
                this.groupedPoints[0].push(el)
            } else if (el.distance >= 100 && el.distance < 200) {
                this.groupedPoints[100].push(el)
            } else if (el.distance >= 200 && el.distance < 300) {
                this.groupedPoints[200].push(el)
            } else if (el.distance >= 300 && el.distance < 400) {
                this.groupedPoints[300].push(el)
            } else {
                this.groupedPoints[400].push(el)
            }
        })
    }

    componentDidMount () {
        const svg = d3.select(this.refs.svg);

        for (let key in this.groupedPoints) {
            const angle = 360 / this.groupedPoints[key].length;
            const g = svg.append('g')
                .attr('id', key);

            this.groupedPoints[key].forEach((point, i) => {
                let x;
                let y;

                if (i === 0) {
                    x = (VB_WIDTH / 2) - point.distance;
                    y = (VB_WIDTH / 2);
                } else {
                    x = (VB_WIDTH / 2) + (point.distance * Math.cos(angle * i));
                    y = (VB_WIDTH / 2) + (point.distance * Math.sin(angle * i));
                }

                g.append('circle')
                    .attr('id', point.id)
                    .attr('r', 4)
                    .attr('cx', x)
                    .attr('cy', y)
                    .attr('fill', point.color)
                    .style('cursor', 'pointer')
                    .on('mouseover', () => {
                        this._appendTooltip(svg, point, {
                            x,
                            y
                        })
                    })
                    .on('click', () => {
                        this._appendTooltip(svg, point, {
                            x,
                            y
                        })
                    })
                    .on('mouseout', () => {
                        svg.select(`#tooltip${point.id}`).remove()
                    })
            })
        }
    }

    _appendTooltip (svg, point, config={}) {
        const tooltip = svg.select('.tooltips-group')
            .append('g')
            .attr('id', `tooltip${point.id}`)
            .attr('transform', `translate(${config.x - TOOLTIP_WIDTH / 2}, ${config.y - TOOLTIP_HEIGHT - 10})`)
            .classed('chart-tooltip', true)
            .on('click', () => {
                tooltip.remove()
            })

        tooltip.append('rect')
            .attr('width', TOOLTIP_WIDTH)
            .attr('height', TOOLTIP_HEIGHT)
            .attr('fill', '#fff')
            .classed('chart-tooltip_bg', true)

        tooltip.append('image')
            .attr('height', TOOLTIP_WIDTH - TOOLTIP_IMAGE_OFFSET)
            .attr('width', TOOLTIP_WIDTH - TOOLTIP_IMAGE_OFFSET)
            .attr('x', TOOLTIP_IMAGE_OFFSET / 2)
            .attr('y', TOOLTIP_IMAGE_OFFSET / 2)
            .attr('xlink:href', point.imageUrl)
            .classed('chart-tooltip_image', true)

        tooltip.append('text')
            .text(point.label)
            .attr('text-anchor', 'middle')
            .attr('x', TOOLTIP_WIDTH / 2)
            .attr('y', TOOLTIP_WIDTH + TOOLTIP_IMAGE_OFFSET / 2 + 5)
            .style('font-size', '1.6rem')
            .classed('chart-tooltip_label', true)
    }

    render () {
        return (
           <svg ref="svg"
                width={WIDTH}
                height={WIDTH}
                viewBox={`0 0 ${VB_WIDTH} ${VB_WIDTH}`}>
               <g className="background-layer">
                   {COLORS.map((color, i) => (
                       <circle key={i}
                               r={65 * color[1]}
                               cx={VB_WIDTH / 2}
                               cy={VB_WIDTH / 2}
                               fill={color[0]}
                       />
                   ))}
               </g>
               <g className="tooltips-group" />
           </svg>
        )
    }
}




