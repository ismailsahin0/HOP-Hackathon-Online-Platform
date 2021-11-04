import EngineController from './../controllers/engine.controller.js'

// Constructor function for objects
function User(id,name , lastname, skills, groupInfo) {
    this.id = id;
    this.name = name;
    this.lastname = lastname;
    this.skills = skills;
    this.groupInfo = groupInfo;
}

function Skill(id,name ,description) {
    this.id = id;
    this.name = name;
    this.description = description;
}

function Group(id,name ,users) {
    this.id = id;
    this.name = name;
    this.users = users;
}

var users;
var groups;
var skills;

var resUsers = EngineController.getAllUserInfo;
for(var i;i<resUsers.length;i++){
    users[i] = new User(resUsers.id,resUsers.name,resUsers.lastname,null,null);
}

var resGroups = EngineController.getAllGroupInfo;
for(var i;i<resGroups.length;i++){
    groups[i] = new User(resGroups.id,resGroups.name,resGroups.users);
}

var resSkills = EngineController.getAllSkillInfo;
for(var i;i<resSkills.length;i++){
    skills[i] = new User(resSkills.id,resSkills.name,resSkills.users);
}