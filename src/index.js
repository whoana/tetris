import './index.css'
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import GameController from './components/GameController'

const EMPTY_WALL = {
  id: '',
  className: 'wall', 
  position: 0,
  blocks:[],
}



const playground = {
  className: 'playground',
  walls: [],
}

//blocks 를 이단계에서 복사하지않으면 얕은 복사가 되어 blocks 는 새로 부여되지 한는다. 따라서 블럭의 스타일도 복사되지않아 상태 처리시 문제가 됨다.
for(let i = 0 ; i < 20 ; i ++){
  const wall = Object.assign({}, EMPTY_WALL);
  wall.id = 'wid' + i
  wall.position = i
  wall.blocks = [
    {id:'bid'+0, className: 'empty'},
    {id:'bid'+1, className: 'empty'},
    {id:'bid'+2, className: 'empty'},
    {id:'bid'+3, className: 'empty'},
    {id:'bid'+4, className: 'empty'},
    {id:'bid'+5, className: 'empty'},
    {id:'bid'+6, className: 'empty'},
    {id:'bid'+7, className: 'empty'},
    {id:'bid'+8, className: 'empty'},
    {id:'bid'+9, className: 'empty'},
  ]

  playground.walls.push(wall)
}

 

ReactDOM.render(
  <div>
    <GameController playground={playground} />
  </div>,
  document.getElementById('root')
);
 