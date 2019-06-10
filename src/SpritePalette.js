import React from 'react';

const images = require.context('../public/img', true);

function Cell(props) {
    let code = props.spriteSheet;
    let imgsrc = images(`./${code}.png`);
    let styler = {
        backgroundImage: `url(${imgsrc})`
    }

    return (
      <div className={props.className}>
        <button style={styler} className={"sprite--inner icon" + props.value} onClick={props.onClick} />
      </div>
    );
  }
  
class SpritePalette extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
        spriteSheet: props.spriteSheet
    };
  }
  
  renderSprite(i, className) {
    return(
      <Cell
        spriteSheet={this.props.spriteSheet}
        value={i}
        className={className}
        onClick={() => this.props.onClick(i)}
      />
    );
  }
  
  /*
  componentWillReceiveProps(nextProps) {
    console.log(nextProps, this.props.spriteSheet, this.state.spriteSheet);
    
    this.setState = {
        spriteSheet: "mushrooms"
    };
  }
  */

  render() {  
    return (
        <div className="sprite-palette bg-dark">  
            {this.renderSprite(1, "sprite-palette--cell")}
            {this.renderSprite(2, "sprite-palette--cell")}
            {this.renderSprite(3, "sprite-palette--cell")}
            {this.renderSprite(4, "sprite-palette--cell")}
            {this.renderSprite(5, "sprite-palette--cell")}
            {this.renderSprite(6, "sprite-palette--cell")}
            {this.renderSprite(7, "sprite-palette--cell")}
            {this.renderSprite(8, "sprite-palette--cell")}
            {this.renderSprite(9, "sprite-palette--cell")}
            {this.renderSprite(10, "sprite-palette--cell")}
            {this.renderSprite(11, "sprite-palette--cell")}
            {this.renderSprite(12, "sprite-palette--cell")}
            {this.renderSprite(13, "sprite-palette--cell")}
            {this.renderSprite(14, "sprite-palette--cell")}
            {this.renderSprite(15, "sprite-palette--cell")}
            {this.renderSprite(16, "sprite-palette--cell")}
        </div>
    );
  }
}

export default SpritePalette;