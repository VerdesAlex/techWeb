import AppContext from '../../state/AppContext'
import './Feedback.css'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Feedback = () => {
  const [list, setList] = useState([])
  const [content, setContent] = useState('')
  const globalState = useContext(AppContext)
  const params = useParams()

  useEffect(() => {
    globalState.task.emitter.addListener('POST_FEEDBACK_SUCCESS', () => {
      console.log('got feedback')
    })

    globalState.task.emitter.addListener('GET_FEEDBACK_SUCCESS', () =>{
      setList(globalState.task.feedbackData)
    })

    globalState.task.getAllFeedback(globalState, params.pid, params.tid)
  }, [])


  return(
    <div>
      <h2>Feedback</h2>
      <ul>
        {
          list.map(item => <li key={item.id}>
            <p>{item.user.email}</p>
            <p>{item.content}</p>
          </li>)
        }
        <li>
          <p>andrei@nowhere.net</p>
          <p>Buggy App</p>
        </li>
      </ul>

      <form>
        <input 
        type='text' 
        placeholder='your feedback...' 
        name='content' 
        value={content}
        onChange={e => setContent(e.target.value)}> 
        </input>
        <button type='button' onClick={() =>{
          globalState.task.postFeedback(globalState, params.pid, params.tid, content)
        }}>Submit</button>
      </form>
    </div>
  )
}

export default Feedback