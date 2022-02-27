import { useState } from 'react';
import './scss/App.scss';

function App() {
  const [boards, setBoards] = useState([
    {id: 1, title: "Task", items: [{id: 1, title: "Shopping"}, {id: 2, title: "Walking"}, {id: 3, title: "Skiing"}]},
    {id: 2, title: "Work", items: [{id: 1, title: "Homework"}]},
    {id: 3, title: "Developing", items: [{id: 1, title: "Header"}]}
  ])
  const [currentItem, setCurrentItem] = useState();
  const [currentBoard, setCurrentBoard] = useState();



 function dragOverHandler (e) {
    e.preventDefault()
    if (e.target.classList.contains('card__item')) {
        e.target.classList.add('card__item_active')
    }
    
  }


  function dragLeaveHandler(e) {
    e.target.classList.remove('card__item_active')
  }

  function dragStartHandler(e, board, item) { 
    e.target.classList.add('card__item_hold')
    setCurrentBoard(board)
    setCurrentItem(item)
  
  }

  function dragEndHandler(e) {
    
    e.target.classList.remove('card__item_hold')
  }

  function dropHandler(e, board, item) {
    e.preventDefault()
    e.stopPropagation()

    const currentIndex = currentBoard.items.indexOf(currentItem)
    setCurrentBoard(currentBoard.items.splice(currentIndex, 1)) 
    
    const dropIndex = board.items.indexOf(item)
    board.items.splice(dropIndex + 1, 0, currentItem)
    

    setBoards(boards.map((b) => {
      if (b.id === board.id) {
        return board
      }
      if (b.id === currentBoard.id) {
        return currentBoard
      }
      return b
    }))
  }

  function dropCardHandler(e, board) {
    board.items.push(currentItem)
    const currentIndex = currentBoard.items.indexOf(currentItem)
    setCurrentBoard(currentBoard.items.splice(currentIndex, 1)) 

    setBoards(boards.map((b) => {
      if (b.id === board.id) {
        return board
      }
      if (b.id === currentBoard.id) {
        return currentBoard
      }
      return b
    }))
  }


  return (
    
    <div className="container">
    <h1 className='container__mainTitle'>React Drag&Drop</h1>
        {boards.map((board) => {
          return (<div className='card' key={board.id} 
          onDragOver={(e) => {dragOverHandler(e)}}
          onDrop={(e) => dropCardHandler(e, board)}
          >
            <div className='card__tittle'>{board.title}</div>
            {board.items.map((item) => {
                return <div className="card__item"
                key={item.title}
                onDragOver={(e) => {dragOverHandler(e)}}
                onDragLeave={(e) => dragLeaveHandler(e)}
                onDragStart={(e) => dragStartHandler(e, board, item)}
                onDragEnd={(e) => dragEndHandler(e)}
                onDrop={(e) => dropHandler(e, board, item)}
                draggable={true}


                >{item.title}
                </div>
              })}
            </div>
          )
        })}
    </div>
  );
}

export default App;
