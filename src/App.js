import React from 'react'
import { BrowserRouter, Route,Router, useHistory } from 'react-router-dom';
import Home from './pages/Home/Home';
import Contact from './pages/Contact/Contact';
import About from './pages/About/About';
import Header from './components/Home/Header/Header';
import { Switch } from 'react-router-dom/cjs/react-router-dom.min';
import Login from './pages/Login/Login';
import Detail from './pages/Detail/Detail';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import Profile from './pages/Profile/Profile';
import TodolistRFC from './pages/Todolist/TodolistRFC';
import TodolistRCC from './pages/Todolist/TodolistRCC';
import ToDoListRedux from './pages/Todolist/ToDoListRedux';
import ToDoListSaga from './pages/ToDoListSaga/ToDoListSaga';
import LoadingComponent from './components/GlobalSetting/Loading/LoadingComponent';
import DemoHOCModal from './pages/DemoHOC/DemoHOCModal';
import Modal from './HOC/Modal/Modal';
import { HomeTemplate } from './templates/HomeTemplate/HomeTemplate';
import { UserLoginTemplate } from './templates/HomeTemplate/UserLoginTemplate';
import LoginCyberBugs from './pages/CyberBugs/LoginCyberBugs/LoginCyberBugs';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { CyberbugsTemplate } from './templates/HomeTemplate/CyberbugsTemplate';
import CreateProject from './pages/CyberBugs/CreateProject/CreateProject';
import ProjectManagement from './pages/CyberBugs/ProjectManagement/ProjectManagement';
import DrawerCyberBugs from './HOC/CyberbugsHOC/DrawerCyberBugs';
import indexCyberBugs from './pages/CyberBugs/ProjectDetail/indexCyberBugs';
import DemoDragDrop from './pages/DemoDragDrop/DemoDragDrop';
import Demo from './pages/Demo/Demo';
import DragAndDropDnD from './pages/DragAndDropDnD/DragAndDropDnD';

function App() {

  const history = useHistory()
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({type: 'ADD_HISTORY', history: history})
  }, [])
  
    return (
      // <BrowserRouter>
      <div >
      {/* <Header/> */}
      <Modal/>
      <DrawerCyberBugs/>
      <LoadingComponent/>
      <Switch>
      {/* <Route exact path='/home' render = {(propsRoute)=> {
        return <div>
          <Header/>
          <Home {...propsRoute}/>
        </div>
      }}></Route> */}
      
      {/* Viết lại theo HOC component  */}
      <HomeTemplate exact path='/' Component= {Home}/>
      <HomeTemplate exact path="/home"  Component= {Home}/>
      <Route exact path='/contact' render = {(propsRoute)=> {
        return <div style={{background: '#fff'}}>
          <Header/>
          <Contact {...propsRoute}/>
        </div>
      }}></Route>
      <HomeTemplate exact path='/about' Component ={About}/>
      <UserLoginTemplate exact path='/login' Component ={LoginCyberBugs}/>
      <HomeTemplate exact path='/detail/:id' Component ={Detail}/>
      <HomeTemplate exact path='/profile' Component ={Profile}/>
      <HomeTemplate exact path='/todolistrfc' Component ={TodolistRFC}/>
      <HomeTemplate exact path='/todolistrcc' Component ={TodolistRCC}/>
      <HomeTemplate exact path='/todolistredux' Component ={ToDoListRedux}/>
      <HomeTemplate exact path='/todolistsaga' Component ={ToDoListSaga}/>
      <HomeTemplate exact path='/demohocmodal' Component ={DemoHOCModal}/>
      <HomeTemplate exact path='/demo' Component={Demo} />
      <HomeTemplate exact path='/dragdrop' Component={DemoDragDrop} />
      <HomeTemplate exact path='/demodragdropdnd' Component={DragAndDropDnD} />
      <CyberbugsTemplate exact path = '/cyberbugs' Component = {indexCyberBugs}/>
      <CyberbugsTemplate exact path = '/createproject' Component = {CreateProject}/>
      <CyberbugsTemplate exact path = '/projectmanagement' Component = {ProjectManagement}/>
      <CyberbugsTemplate exact path='/projectdetail/:projectId' Component={indexCyberBugs} />
      <CyberbugsTemplate exact path='/' Component={ProjectManagement} />
      <Route path="*" Component ={PageNotFound}></Route>
      </Switch>
      </div>
      /* </BrowserRouter> */
    )
}
export default App;
