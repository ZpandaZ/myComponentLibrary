/**
 * 模块名：  图片相册
 * 调用方式：<ImageModalComponent  modalTitle={相册名字} picUrls={图片地址（数组）}/>
 */

import React,{Component,PropTypes}  from 'react';  
import {
  	Modal,
    Button,
    Carousel
} 						from "react-bootstrap";

const boxWidth = 420;       //大图偏移量（大图宽）
const smallBoxWidth = 400;  //小图偏移量（4个缩略图宽+内边距）

export default class ImageModalComponent extends React.Component{

  constructor(props){  
    super(props);  
    this.state = {showModal: false};  
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.carousel = this.carousel.bind(this);
  }
  
  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  //相册左右滑动按钮
  carousel(direction){
    var $box = $("#modal_control_img");
    var marginLeft = parseInt($box.css('marginLeft').slice(0,-2));  //Number:200
    var num = $box.find('a').length;
    var width = num * 100;                 //Number:200

    if(num > 4){
      if(direction == "1" && marginLeft < 0){
          $box.css('marginLeft',marginLeft + smallBoxWidth);
      }else if(direction == "0" && marginLeft - 400 > -width){
        $box.css('marginLeft',marginLeft - smallBoxWidth);
      }
    }
  }

  //相册缩略图跳转
  carouselControlled(index){
    var $box = $("#modal_img");
    $box.css('marginLeft',- index * boxWidth);
  }

  render() {
    var picUrls = this.props.picUrls;
    var imageDiv = [],thumbnailImg = [],carousel = [];
    var that = this;

    //thumbnailImg 缩略图集
    //imageDiv 大图集
    var thumbnailImg = picUrls.map(function(vo,index){
        imageDiv.push(<div key={index} className='modal_div'><img src={vo}/></div>);     
        return (<div className="modal_control_div"><a key={index} onClick={()=>that.carouselControlled(index)}><img src={vo}/></a></div>);
    });

    return (
      <span style={{float:"left",width:160}}>

        <a onClick={this.open}> 图片：{picUrls.length}</a>

        <Modal show={this.state.showModal} onHide={this.close} bsSize="large">
          
          <Modal.Header closeButton>
            <Modal.Title>{this.props.modalTitle}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div className="modal_img_list">
              <div id="modal_img" className="modal_img">
                {imageDiv}
              </div>
            </div>
            <div id="modal_control" className="modal_control">
              <a  style={{float:"left",width:70}} onClick={()=>this.carousel(1)}><img src='./images/previous.png' style={{width:50,margin:10}}/></a>
              <div className="modal_thumbnailImg">
                <div id="modal_control_img" className="modal_control_img">
                  {thumbnailImg}
                </div>
              </div>
              <a  style={{float:"left",width:70}} onClick={()=>this.carousel(0)}><img src='./images/next.png' style={{width:50,margin:10}}/></a>
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </span>
    );
  }
}
