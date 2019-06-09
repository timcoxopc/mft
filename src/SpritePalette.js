import React from 'react';

function Cell(props) {
    return (
      <div className={props.className}>
        <button className={"cell--inner icon" + props.value} onClick={props.onClick} />
      </div>
    );
  }
  
class SpritePalette extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }
  
  renderSprite(i, className) {
    return(
      <Cell
        value={i}
        className={className}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

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