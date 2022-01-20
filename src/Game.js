import React, { Component } from "react"
import './playground.css'


const EMPTY_WALL = {
    id: '',
    className: 'wall',
    position: 0,
    blocks: [],
}



const PLAYGROUND = {
    className: 'playground',
    walls: [],
}

//blocks 를 이단계에서 복사하지않으면 얕은 복사가 되어 blocks 는 새로 부여되지 한는다. 따라서 블럭의 스타일도 복사되지않아 상태 처리시 문제가 됨다.
for (let i = 0; i < 20; i++) {
    const wall = Object.assign({}, EMPTY_WALL);
    wall.id = 'wid' + i
    wall.position = i
    wall.blocks = [
        { id: 'bid' + 0, className: 'empty' },
        { id: 'bid' + 1, className: 'empty' },
        { id: 'bid' + 2, className: 'empty' },
        { id: 'bid' + 3, className: 'empty' },
        { id: 'bid' + 4, className: 'empty' },
        { id: 'bid' + 5, className: 'empty' },
        { id: 'bid' + 6, className: 'empty' },
        { id: 'bid' + 7, className: 'empty' },
        { id: 'bid' + 8, className: 'empty' },
        { id: 'bid' + 9, className: 'empty' },
    ]

    PLAYGROUND.walls.push(wall)
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
    constructor(x, y) {
        this.x = x
        this.y = y
    }
}

const POSITIONS = {
    [iTetromino]: [
        [new Point(1, 2), new Point(2, 2), new Point(3, 2), new Point(4, 2)],
        [new Point(2, 1), new Point(2, 2), new Point(2, 3), new Point(2, 4)],
        [new Point(0, 2), new Point(1, 2), new Point(2, 2), new Point(3, 2)],
        [new Point(2, 0), new Point(2, 1), new Point(2, 2), new Point(2, 3)],
    ],
    [jTetromino]: [
        [new Point(0, 0), new Point(0, 1), new Point(1, 1), new Point(2, 1)],
        [new Point(1, 0), new Point(1, 1), new Point(1, 2), new Point(2, 0)],
        [new Point(0, 1), new Point(1, 1), new Point(2, 1), new Point(2, 2)],
        [new Point(1, 0), new Point(1, 1), new Point(1, 2), new Point(0, 2)],
    ],
    [lTetromino]: [
        [new Point(0, 1), new Point(1, 1), new Point(2, 1), new Point(2, 0)],
        [new Point(1, 0), new Point(1, 1), new Point(1, 2), new Point(2, 2)],
        [new Point(0, 2), new Point(0, 1), new Point(1, 1), new Point(2, 1)],
        [new Point(0, 0), new Point(1, 0), new Point(1, 1), new Point(1, 2)],
    ],
    [oTetromino]: [
        [new Point(1, 0), new Point(2, 0), new Point(1, 1), new Point(2, 1)],
        [new Point(1, 1), new Point(2, 1), new Point(1, 2), new Point(2, 2)],
        [new Point(0, 1), new Point(1, 1), new Point(0, 2), new Point(1, 2)],
        [new Point(0, 0), new Point(1, 0), new Point(0, 1), new Point(1, 1)],
    ],
    [sTetromino]: [
        [new Point(1, 0), new Point(2, 0), new Point(0, 1), new Point(1, 1)],
        [new Point(1, 0), new Point(1, 1), new Point(2, 1), new Point(2, 2)],
        [new Point(0, 2), new Point(1, 2), new Point(1, 1), new Point(2, 1)],
        [new Point(0, 0), new Point(0, 1), new Point(1, 1), new Point(1, 2)],
    ],
    [tTetromino]: [
        [new Point(0, 1), new Point(1, 1), new Point(1, 0), new Point(2, 1)],
        [new Point(1, 0), new Point(1, 1), new Point(1, 2), new Point(2, 1)],
        [new Point(0, 1), new Point(1, 1), new Point(1, 2), new Point(2, 1)],
        [new Point(0, 1), new Point(1, 0), new Point(1, 1), new Point(1, 2)],
    ],
    [zTetromino]: [
        [new Point(0, 0), new Point(1, 0), new Point(1, 1), new Point(2, 1)],
        [new Point(2, 0), new Point(1, 1), new Point(2, 1), new Point(1, 2)],
        [new Point(0, 1), new Point(1, 1), new Point(1, 2), new Point(2, 2)],
        [new Point(1, 0), new Point(0, 1), new Point(1, 1), new Point(0, 2)],
    ]
}

const BLOCK_CLASSES = {
    [iTetromino]: "iTetromino",
    [jTetromino]: "jTetromino",
    [lTetromino]: "lTetromino",
    [oTetromino]: "oTetromino",
    [sTetromino]: "sTetromino",
    [tTetromino]: "tTetromino",
    [zTetromino]: "zTetromino"
}

class Tetromino {
    constructor(type, direction) {
        this.type = type
        this.direction = direction
        this.positions = POSITIONS[this.type][this.direction]
        this.blockClass = "tetromino " + BLOCK_CLASSES[this.type]
    }
}
 
function Block(props) {
    return (
        <div className={props.block.className}></div>
    )
}

function Wall(props) { 
    const wall = props.wall.blocks.map((block, index) => {
        return (
            <Block key={index} block={block}></Block>
        )
    });

    return (
        <div className={props.wall.className}>
            {wall}
        </div>
    )
}
 
function Playground(props){    
    const playground = props.playground.walls.map((wall, index) => {
        return (
            <Wall key={index} wall={wall} />
        )
    });

    return (
        <div className={props.playground.className}>
            {playground}
        </div>
    ) 
}


const beforeGame = Symbol("beforeGame")
const gameOver = Symbol("gameOver")
const gaming = Symbol("gaming")

export default class GameController extends Component {
    constructor(props) {
        super(props)
        this.state = {
            score: 0,
            status: beforeGame,
            walls: PLAYGROUND.walls
        }
        this.handleControlKey = this.handleControlKey.bind(this)
        this.startGame = this.startGame.bind(this)

        
        this.moveToDown = this.moveToDown.bind(this)
        this.moveToLeft = this.moveToLeft.bind(this)
        this.moveToRight = this.moveToRight.bind(this)
        this.moveToBottom = this.moveToBottom.bind(this)
        this.rotate = this.rotate.bind(this)
        this.rotatable = this.rotatable.bind(this)

        this.move = this.move.bind(this)
        this.movable = this.movable.bind(this)
        this.freeze = this.freeze.bind(this)
        this.calcurate = this.calcurate.bind(this) 

        this.height = PLAYGROUND.walls.length
        this.width = PLAYGROUND.walls[0].blocks.length
        this.level = 1
        

        this.resetGame = this.resetGame.bind(this)

        window.addEventListener('keydown', this.handleControlKey)
    }

    startGame() {

       

        console.log('startGame')

        this.setState({ status: gaming })

        this.test = false
        if (this.test) {
            this.tetromino = new Tetromino(oTetromino, 0)
        } else {
            let type = tetrominoSymbols[Math.floor(Math.random() * 7)]
            this.tetromino = new Tetromino(type, 0)
        }
        this.current = new Point(3, 0)

 

        this.setState(prevState => {
             
            const walls = prevState.walls
            this.tetromino.positions.forEach(position => {
                const x = position.x + this.current.x
                const y = position.y + this.current.y
                //walls[y].blocks[x].className = 'block-i'
                walls[y].blocks[x].className = this.tetromino.blockClass
            })
            return { walls: walls }
        })

        this.timerId = setInterval(() => { this.moveToDown() }, 1000 - 100 * (this.level - 1))
    }

    move(dx, dy) {
        this.setState(prevState => {
            // const walls = prevState.walls
            // this.tetromino.positions.forEach(position => {
            //     const x = position.x + this.current.x
            //     const y = position.y + this.current.y
            //     walls[y].blocks[x].className = 'empty'
            // })
 
            // this.current.x += dx
            // this.current.y += dy 

            // this.tetromino.positions.forEach(position => {
            //     const x = position.x + this.current.x
            //     const y = position.y + this.current.y
            //     //walls[y].blocks[x].className = 'block-i'
            //     walls[y].blocks[x].className = this.tetromino.blockClass
            // })
            // return { walls: walls }

            const walls = prevState.walls
            this.tetromino.positions.forEach(position => {
                const x = position.x + this.current.x
                const y = position.y + this.current.y
                walls[y].blocks[x].className = 'empty'
            })
 
            this.current.x += dx
            this.current.y += dy 

            this.tetromino.positions.forEach(position => {
                const x = position.x + this.current.x
                const y = position.y + this.current.y
                //walls[y].blocks[x].className = 'block-i'
                walls[y].blocks[x].className = this.tetromino.blockClass
            })
            return { walls: walls }

        })
    }

    rotate() {


        let direction = this.tetromino.direction === 3 ? 0 : this.tetromino.direction + 1
        let positions = POSITIONS[this.tetromino.type][direction]

        if (this.rotatable(positions)) {
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
                    //walls[y].blocks[x].className = 'block-i'
                    walls[y].blocks[x].className = this.tetromino.blockClass
                })
                return { walls: walls }
            })
        } 
    }
 
    moveToLeft() {

        if (this.movable(-1, 0)) {
            this.move(-1, 0)
        }
    }

    moveToRight() {

        if (this.movable(1, 0)) {
            this.move(1, 0)
        }
    }

    moveToDown() {
        if (this.movable(0, 1)) {
            this.move(0, 1)
        } else {
            this.calcurate()
        }
    }

    moveToBottom() {
        if (this.state.status === gameOver) return
        
        let y = this.current.y;
        while (true) {
            if (this.movable(0, y)) {
                y += 1
                continue
            } else {
                y -= 1
                break
            }
        }
        this.move(0, y)
        this.calcurate()

    }
     
    movable(dx, dy) {
        return this.state.status !== gameOver && !this.tetromino.positions.some(position => {
            let x = position.x + this.current.x + dx
            let y = position.y + this.current.y + dy
            //return x < 0 || x > this.width - 1 || y > this.height - 1 || this.state.walls[y].blocks[x].className === 'freezed'
            return x < 0 || x > this.width - 1 || y > this.height - 1 || this.state.walls[y].blocks[x].className.includes('freezed')
        })
    }

    rotatable(positions) {
        return this.state.status !== gameOver && !positions.some(position => {
            let x = position.x + this.current.x
            let y = position.y + this.current.y
            //return x < 0 || x > this.width - 1 || y > this.height - 1 || this.state.walls[y].blocks[x].className === 'freezed'
            return x < 0 || x > this.width - 1 || y > this.height - 1 || this.state.walls[y].blocks[x].className.includes('freezed')
        })
    }

    freeze() {
        this.setState(prevState => {
            const walls = prevState.walls

            this.tetromino.positions.forEach(position => {
                let x = position.x + this.current.x
                let y = position.y + this.current.y
                walls[y].blocks[x].className = walls[y].blocks[x].className + ' freezed'
            });
            return { walls: walls }
        })
    }

    calcurate() {
        let score = this.state.score;
        this.setState(prevState => {
            const walls = prevState.walls
            let status = prevState.status
            this.tetromino.positions.forEach(position => {
                let x = position.x + this.current.x
                let y = position.y + this.current.y
                //walls[y].blocks[x].className = 'freezed'
                walls[y].blocks[x].className = walls[y].blocks[x].className + ' freezed'
                
            });

            let max = 0
            let min = 20
            this.tetromino.positions.forEach(position => {
                const h = position.y + this.current.y
                max = max < h ? h : max
                min = min > h ? h : min
            })

            for (let y = min; y <= max; y++) {
                const isFreezed = walls[y].blocks.every(block => {
                    //return block.className === 'freezed'
                    return block.className.includes('freezed')
                })

                if (isFreezed) {
                    //this.score += 10
                    //this.setState((prevState) => { return { score: prevState.score + 10 } })
                    score += 10
                    walls.splice(y, 1)


                    let wall = {
                        id: '0',
                        className: 'wall',
                        position: 0,
                        blocks: [
                            { id: 'bid' + 0, className: 'empty' },
                            { id: 'bid' + 1, className: 'empty' },
                            { id: 'bid' + 2, className: 'empty' },
                            { id: 'bid' + 3, className: 'empty' },
                            { id: 'bid' + 4, className: 'empty' },
                            { id: 'bid' + 5, className: 'empty' },
                            { id: 'bid' + 6, className: 'empty' },
                            { id: 'bid' + 7, className: 'empty' },
                            { id: 'bid' + 8, className: 'empty' },
                            { id: 'bid' + 9, className: 'empty' },
                        ]
                    }
                    walls.unshift(wall)
                }
            }

            if (this.test) {
                this.tetromino = new Tetromino(oTetromino, 0)
            } else {
                let type = tetrominoSymbols[Math.floor(Math.random() * 7)]
                this.tetromino = new Tetromino(type, 0)
            }

            this.current = new Point(3, 0)
            if (this.movable(0, 1)) {
                //this.start()
                this.tetromino.positions.forEach(position => {
                    const x = position.x + this.current.x
                    const y = position.y + this.current.y
                    //walls[y].blocks[x].className = 'block-i'
                    walls[y].blocks[x].className = this.tetromino.blockClass
                })
            } else {
                 
                //this.setState({status: gameOver})
                status = gameOver
                clearInterval(this.timerId)
            }

            return { walls: walls, status: status, score: score}
        })

        if (this.state.status === gameOver) console.log('Game Over!')
    }
 
    handleControlKey(event) {
        //console.log(event.keyCode)
        if (this.state.status === gameOver) {
            console.log("game over or game did not start.")
            return
        }

        switch (event.keyCode) {
            case 71:
                if (this.state.status === beforeGame) {
                    this.startGame()
                } 
                break
            case 32:
                //debugger
                this.moveToBottom()
                break
            case 37:
                this.moveToLeft()
                break
            case 65:
                this.moveToLeft()
                break
            case 38:
                this.rotate()
                break
            case 87:
                this.rotate()
                break
            case 40:
                this.moveToDown()
                break
            case 83:
                this.moveToDown()
                break
            case 39:
                this.moveToRight()
                break
            case 68:
                this.moveToRight()
                break
            default:
                break;
        }
    }

    resetGame() {
        document.location.reload()
    }

    render() {

        return (
            <>
                <div className="flex">
                    <label>Point:{this.state.score}</label>
                    {/* <button onClick={this.startGame}>Start</button>
                    <button onClick={this.resetGame}>Reset</button> */}
                </div>
                <div className="flex">
                    {/* <div  className="flex" onKeyDown={this.handleControlKey} tabIndex={-1}> */}
                    <div className="flex">
                        <Playground playground={PLAYGROUND} />
                    </div>
                    {/* <br></br>
                    <div>
                        <div className="flex">
                            <button onClick={this.rotate}>Rotate</button>
                        </div>
                        <br></br>
                        <div className="flex">
                            <button onClick={this.moveToLeft}>Left</button>
                            <button onClick={this.moveToDown}>Down</button>
                            <button onClick={this.moveToRight}>Right</button>
                        </div>
                        <br></br>
                        <div className="flex">
                            <button onClick={this.moveToBottom}>Bottom</button>
                        </div>
                    </div> */}
                </div>
            </>
        )
    }
}
