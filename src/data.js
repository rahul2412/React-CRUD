import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';


class Data extends React.Component {

  constructor(props){ 
  
  super(props);
  
  this.state={ id_new:"", name_new:"", skill_new:"", 
  data: [{id:0, name: "Rohan", skill: "Testing"},
  {id:1, name: "Raghav", skill: "Vue.js"},
  {id:2, name: "Sachin", skill: "Ruby on rails"},
  {id:3, name: "Ritesh", skill: "IOT"},
  {id:4, name: "Yash", skill: "Go"}]};
  
  this.removeIt = this.removeIt.bind(this);
  this.updateIt = this.updateIt.bind(this);
  this.createIt = this.createIt.bind(this);
  this.handleChangeId = this.handleChangeId.bind(this);
  this.handleChangeName = this.handleChangeName.bind(this);
  this.handleChangeSkill = this.handleChangeSkill.bind(this);
  
  }
  
  async removeIt(name,id) {
  
  
  console.log(name+ " deleted");
  
  /*
  
  this.setState({
  
  data: this.state.data.filter((_, i) => _.name !== name)
  
  });
  */
 //Alternate way but discouraged

  
  await this.setState((prevState) => ({
  
  data: prevState.data.filter((_, i) => _.id !== id)
  
  }));
  
  
  console.log(this.state.data);
  
  }
  
  
  async updateIt(name) {
  
  let new_skill = prompt("Enter Skills for "+name);
  
  //console.log(name+"- "+new_skill);
  
  
  let old_data=this.state.data;
  
  
  let new_data= await old_data.map(item=>{
  
  if(item.name===name){
  
  return {...item,skill:new_skill}
  
  }
  
  else return item;
  
  })
  
  
  this.setState({data:new_data});
  
  console.log(this.state.data);
  
  
  
  }
  
  async createIt(e){

  e.preventDefault();
  
  // for checking whether id is unique or not
  let x = this.state.id_new;
  let flag = 1;
  for (let i=0;i<this.state.data.length;i++)
  { 
    let y =  this.state.data[i].id.toString();
    
    if(x===y)
    {
      alert ("Please enter a unique id ");
      flag = 0;
      break;
    } 

  }

  if (flag ===1 )
  {

  let new_item={id:this.state.id_new, name:this.state.name_new, skill:this.state.skill_new};
  
 await this.setState((prevState) => {
  
  return {
  
  data: prevState.data.concat(new_item)
  
  };
  
  });
  
    console.log(this.state.data);
}
this.setState({id_new:"", name_new:"", skill_new:""});

}
  
  handleChangeId(e){
  
  this.setState({id_new:e.target.value});
  
  }
  
  handleChangeName(e){
  
  this.setState({name_new:e.target.value});
  
  }
  
  handleChangeSkill(e){
  
  this.setState({skill_new:e.target.value});
  
  }
  
  render() {
  
  let list=this.state.data;
  
  return(
  
  <div>
   
  
  <form style={{textAlign:"center"}} onSubmit={this.createIt}>
  
  
  <input name="id" required type="text" value={this.state.id_new} onChange={this.handleChangeId} placeholder="Enter id" />
  
  <input name="name" required type="text" value={this.state.name_new} onChange={this.handleChangeName} placeholder="Enter name" />
  
  <input name="skill" required type="text" value={this.state.skill_new} onChange={this.handleChangeSkill} placeholder="Enter skill" />
  
  <span><Button variant="success" type="submit">Create</Button></span>
  
  </form>
  <br/>
  
  <div><ul style= {{listStyleType: "none"}}>
  <Container>
  <Row>
    <Col style={{fontWeight: "bold"}} md={2}>Id</Col>
    <Col style={{fontWeight: "bold"}} md={2}>Name</Col>
    <Col style={{fontWeight: "bold"}} md={2}>Skill</Col>
    <Col style={{fontWeight: "bold"}} md={2}>Action</Col>
    <Col style={{fontWeight: "bold"}} md={2}>Action</Col>
  </Row>
  </Container>
  
  {list.map(item => (
  
  <li style={{
    border: "1px solid",
    padding: "10px",
    boxShadow: "5px 10px #888888"
  }} key={item.id}>
  
  <Container>
  <Row>
    <Col md={2}>{item.id}</Col>
    <Col md={2}>{item.name}</Col>
    <Col md={2}>{item.skill}</Col>
    <Col md={2}><Button variant="primary" onClick={() => {this.updateIt(item.name) }}>Update</Button></Col>
    <Col md={2}><Button variant="danger" onClick={() => {this.removeIt(item.name, item.id) }}>Delete</Button></Col>
  </Row>
  </Container>
  
  <br/><br/></li>
  
  ))}
  
  </ul>
  
</div>

</div>  
  )

  }
  
  }
export default Data;

