let canvas;
let c;
let snake;
let cellSize=10;
let width;
let height;
let snakeFood;
let score=0;


const loadGame = function(){
  canvas =document.querySelector('canvas');
  width=canvas.offsetWidth;
  height=canvas.offsetHeight;
  c = canvas.getContext('2d');
  snake=new Snake(50,100,cellSize,'#111');
  snakeFood=new Food('red',cellSize);
  draw();
  window.addEventListener('keydown',keyPressed);

};

const limit= function(x,dx,lastPossibleX){
  if(x >= lastPossibleX){
    x-=dx;
  }else if(x < 0){
    x+=dx;
  }
  return x;
};

const draw = function(){
  function animate(){
  requestAnimationFrame(animate);
  c.clearRect(0,0,innerWidth,innerHeight);
  snake.update();
  if(snake.isDead()){
    document.getElementById('gameover').style.visibility = null;
    setTimeout(location.reload.bind(location),1000);

  }
  if(snake.isEat(snakeFood)){
    snake.length++;
    score+=10;
    let scoreBord=document.getElementById('score');
    scoreBord.innerText='Score : '+score;
    snakeFood=new Food('red',cellSize);
  }
  let scoreBord=document.getElementById('score');
  scoreBord.innerText='Score : '+score;
  snakeFood.draw();
  snake.draw();

    };
 animate();
};

const keyPressed= function(event){
  switch (event.key) {
    case "ArrowDown":
      x=0;
      y=1;
      break;

    case "ArrowUp":
      x=0;
      y= -1;
      break;

    case "ArrowRight":
      x=1;
      y=0;
      break;

    case "ArrowLeft":
      x=-1;
      y= 0;
      break;

    default:
      return;

  }
    snake.direct(x,y);

};

const Food = function(color,side){
  let cols=Math.floor(width/cellSize)*7;
  let row=Math.floor(height/cellSize)*3;
  this.x=Math.floor(Math.random()*cols);
  this.y=Math.floor(Math.random()*row);
  this.color=color;
  this.side=side;
};

Food.prototype={
  draw : function(){
    c.fillStyle=this.color;
    c.fillRect(this.x,this.y,this.side,this.side);
  }

};

const getDistance = function(x1,y1,x2,y2){
  let xDistance = x2-x1;
  let yDistance = y2-y1;
  return Math.sqrt(Math.pow(xDistance,2)+Math.pow(yDistance,2));
};

const Snake = function(x,y,side,color){
 this.x=x;
 this.y=y;
 this.xSpeed=1;
 this.ySpeed=0;
 this.color=color
 this.side=side;
 this.length=1;
 this.body=[];
};

Snake.prototype ={
  update : function(){
    if(this.length===this.body.length){
      for(let i=0;i<this.body.length-1;i++){
        this.body[i]=this.body[i+1];
      }
    }
    this.body[this.length-1]=snake.getCell(this.x,this.y);
    this.x+=this.xSpeed;
    this.y+=this.ySpeed;
    this.x=limit(this.x,1,width-2*cellSize);
    this.y=limit(this.y,1,height-2*cellSize);

  },
  draw : function(){
    c.fillStyle=this.color;
    for(i=0;i<this.body.length;i++){
      c.fillRect(this.body[i].x,this.body[i].y,this.side,this.side);
    }
     c.fillRect(this.x,this.y,this.side,this.side);
  },
  direct : function(x,y){
    this.xSpeed=x;
    this.ySpeed=y;
  },
  isEat : function(foodPosition){
    let distance = getDistance(this.x,this.y,foodPosition.x,foodPosition.y);
    if(distance < this.side){
      return true;
    }
    return false;
  },
  getCell : function(x,y){
    return {x:x,y:y};
  },
  isDead : function(){
    let bodyCellPosition;
    let distance;
    for(let i=0;i<this.body.length;i++){
      bodyCellPosition=this.body[i];
      distance=getDistance(this.x,this.y,bodyCellPosition.x,bodyCellPosition.y);
      if(distance<1){
        return true;
      }
    }
    return false;
  }
};

let startGame = function(){
  let game = document.getElementById('start');
  game.onclick = loadGame;
}

window.onload = startGame







// let Snake = function(x,y,color){
//   // this._length =0;
//   this.xSpeed;
//   this.ySpeed;
//   this.x;
//   this.y;
//   // this.head=new Cell(x,y,color);
//   // this.head.length=this._length;
// };
//
// Snake.prototype={
//   update :function(){
//
//   },
//   getHeadPosition : function(){
//     return {x:this.head.x,y:this.head.y};
//   },
//   grow :function(){
//     this._length++;
//   },
//   draw : function(){
//     this.head.draw(this._length);
//     this.move();
//   },
//   getFood : function(x,y,color){
//     let food = new Cell(x,y,color);
//     return food;
//   },
//   moveDown : function(){
//     this.head.y+=1;
//     return this.head;
//   },
//   moveUp : function(){
//     this.head.y-=1;
//     return this.head;
//   },
//   moveRight : function(){
//     this.head.x+=1;
//     return this.head;
//   },
//   moveLeft : function(){
//     this.head.x-=1;
//     return this.head;
//   }
// };
// module.exports=Snake;
