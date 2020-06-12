import React from 'react';
import glasses from './media/glasses.svg';
import resume from './media/resume.pdf';
import main from './get/main.json';
import about from './get/about.json';
import './Nav.css';
import './Content.css';
import './Page.css';

function NavBarElem(props) {
  return (
    <button className="navBarElem" id={props.id} key={props.id} onClick={props.onClick}>
      <p>{props.text}</p>
      <div className="elemBack">  
      </div>
    </button>
  );
}

class NavBar extends React.Component {
  render() {
    let elems = [((this.props.contentType === "landing") ? "About" : "Main"), 'Resume', 'LinkedIn', 'GitHub'];
    let navElems = elems.map((elem) => {return (<NavBarElem key={elem} id={elem} text={elem} onClick={this.props.functions[elem]}/>);});
    return  (
      <nav>
        {navElems}
      </nav>
    );
  }
}

function MainPage(props) {
  return(
    <div className={props.content.style+"centerContent"}>
      <div className={props.content.style+"content"}>
        <img src={glasses} width="250px"/>
        <h1> {props.content.title} </h1>
        <p>{
          props.content.positions.join(" | ")
        }</p>
      </div>
    </div>
  );
}

function AboutPage(props) {
  let paras = props.content.paragraphs.map((content) => {
    return <p key={content} className={props.content.style+"para"}>{content}</p>
  });
  return (
    <div className={props.content.style+"content"}>
      <h1 className={props.content.style+"header"}>
        {props.content.title}
      </h1>
      {paras}
    </div>
  );
}

function Resume(props) {
  return (
    <div className="document">
      <iframe src={resume} frameBorder={0}></iframe>
    </div>
  );
}

class Content extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var BasicPage;
    if(this.props.content["page-type"] === "landing") {
      BasicPage = MainPage;
    } else if (this.props.content["page-type"] === "paragraph") {
      BasicPage = AboutPage;
    } else if (this.props.content === "resume") {
      BasicPage = Resume;
    }
    return (
      <BasicPage content={this.props.content} />
    );
  }
}

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content : main,
    }
    this.About = this.About.bind(this);
    this.Main = this.Main.bind(this);
    this.Resume = this.Resume.bind(this);
    this.LinkedIn = this.LinkedIn.bind(this);
    this.GitHub = this.GitHub.bind(this);
    /*let funcs = [this.About, this.Main, this.Resume, this.LinkedIn, this.GitHub];
    for (let i = 0; i < funcs.length; i++) {
      funcs[i] = funcs[i].bind(this);
    }*/
  }

  About() {
    this.setState({
      content: about
    });
  }

  Main() {
    this.setState({
      content: main
    });
  }

  Resume() {
    this.setState({
      content: "resume"
    });
  }

  LinkedIn() {
    this.setState({
      content: "loading"
    });
    window.location.assign("https://www.linkedin.com/in/koblu/");
  }

  GitHub() {
    this.setState({
      content: "loading"
    });
    window.location.assign("https://www.github.com/koblu/");
  }

  render() {
    let funcs ={
      About: this.About, 
      Resume: this.Resume, 
      LinkedIn: this.LinkedIn,
      GitHub: this.GitHub,
      Main: this.Main
    }
    return (
      <div id="Page">
        <div id="pageCover"></div>
        <NavBar functions = {funcs} landingFunc={this.Main} contentType={this.state.content["page-type"]}/>
        <Content content={this.state.content}/>
      </div>

    );
  }
}



function App() {
  return (
    <div>
      <Page />
    </div>
  );
}

export default App;
