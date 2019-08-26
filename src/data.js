import React from 'react';

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
  
  
  <br/>
  
  <form onSubmit={this.createIt}>
  
  
  <input name="id" required type="text" value={this.state.id_new} onChange={this.handleChangeId} placeholder="Enter id" />
  
  <input name="name" required type="text" value={this.state.name_new} onChange={this.handleChangeName} placeholder="Enter name" />
  
  <input name="skill" required type="text" value={this.state.skill_new} onChange={this.handleChangeSkill} placeholder="Enter skill" />
  
  <input type="submit" value="Submit"/>
  
  </form>
  
  <ul style= {{listStyleType: "none"}}>
  
  {list.map(item => (
  
  <li key={item.id}>
  
  <div>{item.id}</div>
  
  <div>{item.name}</div>
  
  <div>{item.skill}</div>
  
  <button onClick={() => {this.removeIt(item.name, item.id) }}>Delete</button>
  
  <button onClick={() => {this.updateIt(item.name) }}>Update</button>
  
  <br/><br/></li>
  
  ))}
  
  </ul></div>
  
  )

  }
  
  }
export default Data;

