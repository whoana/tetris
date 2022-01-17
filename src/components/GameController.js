import React, { Component } from "react"
import './../css/playground.css'

export function Block(props){
    //console.log('redrawing')
    return (
        <div className={props.block.className}></div>
    )
}

export function Wall(props){
    const position = props.wall.position
    const size = props.wall.blocks.length
    const className = props.wall.className
    //console.log(`Wall[position: ${position}, size:${size}].class:${className}`)

    
    const wall = props.wall.blocks.map((block, index) => {
        return (
            <Block key={index} block={block}></Block>
        )
    });
    
    return (
        <div className={className}>
            {wall}
        </div>
    )
}


export class Playground extends Component{
    constructor(props){
        super(props)
        this.walls = props.playground.walls
        this.height = this.walls.length
        this.width = this.walls[0]?.blocks?.length
        this.className = props.playground.className
        //console.log(`Playground[width: ${this.width}, height:${this.height}].class:${this.className}`)
    }

    render(){
        const playground = this.walls.map((wall, index) => {
            return (
                <Wall key={index} wall={wall}/>
            )
        });
    
        return (
            <div className={this.className}>
                {playground}
            </div>
        )
    }

}
 
const iTetromino = Symbol('iTetromino')
const jTetromino = Symbol('jTetromino')
const lTetromino = Symbol('lTetromino')
const oTetromino = Symbol('oTetromino')
const sTetromino = Symbol('sTetromino')
const tTetromino = Symbol('tTetromino')
const zTetromino = Symbol('zTetromino')

const tetrominoSymbols = [
    iTetromino,
    jTetromino,
    lTetromino,
    oTetromino,
    sTetromino,
    tTetromino,
    zTetromino,
]
const COLORS = {
    [iTetromino]: "magenta",
    [jTetromino]: "blue",
    [lTetromino]: "orange",
    [oTetromino]: "yellow",
    [sTetromino]: "green",
    [tTetromino]: "violet",
    [zTetromino]: "red"
}

class Point {
    constructor(x, y){
        this.x = x
        this.y = y
    }
}

const POSITIONS ={
    [iTetromino]: [
        [new Point(1,2), new Point(2,2), new Point(3,2), new Point(4,2)],
        [new Point(2,1), new Point(2,2), new Point(2,3), new Point(2,4)],
        [new Point(0,2), new Point(1,2), new Point(2,2), new Point(3,2)],
        [new Point(2,0), new Point(2,1), new Point(2,2), new Point(2,3)],
    ],
    [jTetromino]: [
        [new Point(0,0), new Point(0,1), new Point(1,1), new Point(2,1)],
        [new Point(1,0), new Point(1,1), new Point(1,2), new Point(2,0)],
        [new Point(0,1), new Point(1,1), new Point(2,1), new Point(2,2)],
        [new Point(1,0), new Point(1,1), new Point(1,2), new Point(0,2)],
    ],
    [lTetromino]: [
        [new Point(0,1), new Point(1,1), new Point(2,1), new Point(2,0)],
        [new Point(1,0), new Point(1,1), new Point(1,2), new Point(2,2)],
        [new Point(0,2), new Point(0,1), new Point(1,1), new Point(2,1)],
        [new Point(0,0), new Point(1,0), new Point(1,1), new Point(1,2)],
    ],
    [oTetromino]: [
        [new Point(1,0), new Point(2,0), new Point(1,1), new Point(2,1)],
        [new Point(1,1), new Point(2,1), new Point(1,2), new Point(2,2)],
        [new Point(0,1), new Point(1,1), new Point(0,2), new Point(1,2)],
        [new Point(0,0), new Point(1,0), new Point(0,1), new Point(1,1)],
    ],
    [sTetromino]: [
        [new Point(1,0), new Point(2,0), new Point(0,1), new Point(1,1)],
        [new Point(1,0), new Point(1,1), new Point(2,1), new Point(2,2)],
        [new Point(0,2), new Point(1,2), new Point(1,1), new Point(2,1)],
        [new Point(0,0), new Point(0,1), new Point(1,1), new Point(1,2)],
    ],
    [tTetromino]: [
        [new Point(0,1), new Point(1,1), new Point(1,0), new Point(2,1)],
        [new Point(1,0), new Point(1,1), new Point(1,2), new Point(2,1)],
        [new Point(0,1), new Point(1,1), new Point(1,2), new Point(2,1)],
        [new Point(0,1), new Point(1,0), new Point(1,1), new Point(1,2)],
    ],
    [zTetromino]: [
        [new Point(0,0), new Point(1,0), new Point(1,1), new Point(2,1)],
        [new Point(2,0), new Point(1,1), new Point(2,1), new Point(1,2)],
        [new Point(0,1), new Point(1,1), new Point(1,2), new Point(2,2)],
        [new Point(1,0), new Point(0,1), new Point(1,1), new Point(0,2)],
    ]
}
 
const playgroundWith = 10 
const playgroundHeight = 20  
let playground
let oldTetromino
let tetromino
let current
//let score = 0
//let timerId
//let gameOver = false



class Tetromino {
    constructor(type, direction){
        this.type = type 
        this.direction = direction
        this.positions = POSITIONS[this.type][this.direction];
    }
}

export default class GameController extends Component{
    constructor(props){
        super(props)
        this.state = {
            score : 0, 
            walls : this.props.playground.walls
        }
        this.handleControlKey = this.handleControlKey.bind(this)
        this.startGame = this.startGame.bind(this)
        //this.start = this.start.bind(this)
        this.isGameOver = this.isGameOver.bind(this)
        this.moveToDown = this.moveToDown.bind(this)
        this.moveToLeft = this.moveToLeft.bind(this)
        this.moveToRight = this.moveToRight.bind(this)
        this.moveToBottom = this.moveToBottom.bind(this)
        this.rotate = this.rotate.bind(this)
        this.rotatable = this.rotatable.bind(this)
        // this.draw = this.draw.bind(this)
        // this.erase = this.erase.bind(this)
        this.move = this.move.bind(this)
        this.movable = this.movable.bind(this)
        this.freeze = this.freeze.bind(this)
        this.calcurate = this.calcurate.bind(this)
        this.endOfGame = this.endOfGame.bind(this)

        this.height = this.props.playground.walls.length
        this.width = this.props.playground.walls[0].blocks.length
        this.level = 1
        this.gameOver = true
        //this.score = 0
    }

    startGame(){
        console.log('startGame')
        
        this.test = false
        if(this.test){
            this.tetromino = new Tetromino(oTetromino, 0)
        }else{
            let type = tetrominoSymbols[Math.floor(Math.random() * 7)]
            this.tetromino = new Tetromino(type, 0)
        }
        this.current = new Point(3,0)
        
        
        this.gameOver = false
         
        this.setState(prevState =>{
            const walls = prevState.walls
            this.tetromino.positions.forEach(position => {
                const x = position.x + this.current.x
                const y = position.y + this.current.y            
                walls[y].blocks[x].className = 'block-i'
            })
            return {walls: walls}
        })

        this.timerId = setInterval(()=>{ this.moveToDown() }, 1000 - 100 * (this.level - 1))        
    }

    // start(){

    //     this.setState(prevState =>{
    //         const walls = prevState.walls
    //         this.tetromino.positions.forEach(position => {
    //             const x = position.x + this.current.x
    //             const y = position.y + this.current.y            
    //             walls[y].blocks[x].className = 'block-i'
    //         })
    //         return {walls: walls}
    //     })
    // }
 

    move(dx, dy){
        this.setState(prevState => {
            const walls = prevState.walls 
            this.tetromino.positions.forEach(position => {
                const x = position.x + this.current.x
                const y = position.y + this.current.y            
                walls[y].blocks[x].className = 'empty'
            })

            console.log("dx,dy:"+ dx, dy)
            console.log(this.current)
            this.current.x += dx
            this.current.y += dy
            console.log(this.current)

            this.tetromino.positions.forEach(position => {
                const x = position.x + this.current.x
                const y = position.y + this.current.y            
                walls[y].blocks[x].className = 'block-i'
            })
            return {walls: walls}
        })
    }

    rotate(){
         

        let direction = this.tetromino.direction === 3 ? 0 : this.tetromino.direction + 1
        let positions = POSITIONS[this.tetromino.type][direction]
        
        if(this.rotatable(positions)){            
            this.setState(prevState => {
                const walls = prevState.walls 
                this.tetromino.positions.forEach(position => {
                    const x = position.x + this.current.x
                    const y = position.y + this.current.y            
                    walls[y].blocks[x].className = 'empty'
                })
                this.tetromino.direction = direction
                this.tetromino.positions = positions
                this.tetromino.positions.forEach(position => {
                    const x = position.x + this.current.x
                    const y = position.y + this.current.y            
                    walls[y].blocks[x].className = 'block-i'
                })                
                return {walls: walls}
            })
        }
        console.log(this.current)
    }

 

    isGameOver(){
        return this.gameOver;
    } 

    moveToLeft(){
         
        if(this.movable(-1,0)){
            this.move(-1, 0)
        }
    }
    
    moveToRight(){
         
        if(this.movable(1,0)){
            this.move(1, 0)
        }
    }

    moveToDown(){
        console.log('moveToDown')
        if(this.movable(0,1)){
            this.move(0, 1)
        }else{
            this.calcurate()
        }
    }
    
    moveToBottom(){
        
        if(this.gameOver) {
            return
        }
        let y = this.current.y;
        while(true){
            if(this.movable(0, y)) {
                y += 1
                continue
            }else{
                y -= 1
                break
            }
        }
        this.move(0,y)
        this.calcurate()
        
    }

    movable(dx, dy){
        return !this.gameOver && !this.tetromino.positions.some(position => {
            let x = position.x + this.current.x + dx
            let y = position.y + this.current.y + dy
            return x < 0 || x > this.width - 1 || y > this.height - 1 || this.state.walls[y].blocks[x].className === 'freezed'
        }) 
    }
    
    rotatable(positions){
        return !this.gameOver && !positions.some(position => {
            let x = position.x + this.current.x
            let y = position.y + this.current.y 
            return x < 0 || x > this.width - 1 || y > this.height - 1 || this.state.walls[y].blocks[x].className === 'freezed'
        }) 
    }

    freeze(){
        this.setState(prevState => {
            const walls = prevState.walls
            
            this.tetromino.positions.forEach(position => {            
                let x = position.x + this.current.x
                let y = position.y + this.current.y
                walls[y].blocks[x].className = 'freezed'
            });
            return {walls:walls}
        })
    }
 
    calcurate(){
         
        this.setState(prevState => {
            const walls = prevState.walls
            
            this.tetromino.positions.forEach(position => {            
                let x = position.x + this.current.x
                let y = position.y + this.current.y
                walls[y].blocks[x].className = 'freezed'
            });

            let max = 0
            let min = 20
            this.tetromino.positions.forEach(position=>{
                const h = position.y + this.current.y
                max = max < h ? h : max
                min = min > h ? h : min
            })
            
            for(let y = min ; y <= max; y ++){
                const isFreezed = walls[y].blocks.every(block => {
                    return block.className === 'freezed' 
                })
                  
                if(isFreezed) {
                    //this.score += 10
                    this.setState((prevState) => {return {score: prevState.score + 10}})
                    console.log("score:" + this.state.score)
                    walls.splice(y, 1)


                    let wall = {
                        id: '0',
                        className: 'wall',
                        position: 0,
                        blocks: [
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
                    }
                    walls.unshift(wall)
                }
            }
 
            if(this.test){
                this.tetromino = new Tetromino(oTetromino, 0)
            }else{
                let type = tetrominoSymbols[Math.floor(Math.random() * 7)]
                this.tetromino = new Tetromino(type, 0)
            }
            
            this.current = new Point(3,0)
            if(this.movable(0, 1)){
                 //this.start()
                 this.tetromino.positions.forEach(position => {
                    const x = position.x + this.current.x
                    const y = position.y + this.current.y            
                    walls[y].blocks[x].className = 'block-i'
                })
            }else{
                this.gameOver = true;
                clearInterval(this.timerId)
            }

            return {walls: walls}
        })

        if(this.gameOver) console.log('Game Over!')
    }

    /**
     * 첫 테트로미노 가 이동할 곳이 없으면 게임을 더이상 
     * 진행할 수 없는 것으로 판단한다. 
     */
    endOfGame(){
        if(this.current.y === 0){
            this.gameOver = !this.movable(0, 1)
        }
    }

    handleControlKey(event){
        //console.log(event.keyCode)
        if(event.keyCode !== 71 && this.gameOver){ 
            console.log("game over or game did not start.")
            return
        }
 
        switch(event.keyCode) {
            case 71 : 
                this.startGame()
                
                break
            case 32 : 
                //debugger
                //clearInterval(this,this.timerId)
                this.moveToBottom()
                //this.timerId = setInterval(()=>{ this.moveToDown() }, 1000 - 100 * (this.level - 1))
                break
            case 37 : 
                this.moveToLeft() 
                break
            case 65 :
                this.moveToLeft() 
                break     
            case 38 :
                this.rotate()
                break
            case 87 :
                this.rotate()
                break                
            case 40 :
                this.moveToDown()
                break
            case 83 :
                this.moveToDown()
                break                
            case 39 :
                this.moveToRight()      
                break
            case 68 :
                this.moveToRight()      
                break                
            default:
                break;
        }
    }

    render(){
        return(
            <>
                <div>
                    <label>Point:{this.state.score}</label>
                    <button onClick={this.startGame}>Start</button>
                </div>
                <div onKeyDown={this.handleControlKey} tabIndex={-1}>
                    <Playground playground={this.props.playground} />
                </div>
                <div>
                    <button onClick={this.rotate}>Rotate</button>
                </div>
                <div>
                    <button onClick={this.moveToLeft}>Left</button>
                    <button onClick={this.moveToDown}>Down</button>
                    <button onClick={this.moveToRight}>Right</button>
                </div>
                <div>
                    <button onClick={this.moveToBottom}>Bottom</button>
                </div>
            </>
        )
    }
}
 