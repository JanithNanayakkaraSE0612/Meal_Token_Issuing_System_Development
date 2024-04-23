import React from 'react'
import './App.css'
import { Space } from "antd";
import AppHeader from './components/AppHeader';
import SideMenu from './components/SideMenu';
import AppFooter from './components/AppFooter';
import Sidebar from './components/SideBar';
import PageContent from './components/PageContent';


const App = () => {
  return (
    <div className="App">
    <AppHeader />
    <div className="SideMenuAndPageContent">
      {/* <Sidebar/> */}
      {/* <PageContent></PageContent> */}
      <PageContent/>
    </div>
    <AppFooter />
  </div>
  )
}

export default App