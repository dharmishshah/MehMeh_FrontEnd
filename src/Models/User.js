function User(username, password, emailId, firstName, lastName, phone, role, dob, gender, profilePicture, status) {
    this.username = username;
    this.password = password;
    this.emailId = emailId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
    this.role = role;
    this.dob = dob;
    this.gender = gender;
    this.profilePicture = profilePicture;
    this.status = status;
    this.setGender = setGender;
    this.getGender = getGender;
    this.setProfilePicture = setProfilePicture;
    this.getProfilePicture = getProfilePicture;
    this.setStatus = setStatus;
    this.getStatus = getStatus;
    this.setUsername = setUsername;
    this.getUsername = getUsername;
    this.setPassword = setPassword;
    this.getPassword = getPassword;
    this.getEmailId = getEmailId;
    this.setEmailId = setEmailId;
    this.getFirstName= getFirstName;
    this.setFirstName = setFirstName;
    this.getLastName= getLastName;
    this.setLastName = setLastName;
    this.getPhone = getPhone;
    this.setPhone = setPhone;
    this.getRole = getRole;
    this.setRole = setRole;
    this.getDOB = getDOB;
    this.setDOB = setDOB;

    function setStatus(status) {
        this.status = status;
    }

    function getStatus() {
        return this.status;
    }

    function setProfilePicture(profilePicture) {
        this.profilePicture = profilePicture;
    }

    function getProfilePicture() {
        return this.profilePicture;
    }

    function setGender(gender) {
        this.gender = gender;
    }

    function getGender() {
        return this.gender;
    }

    function setUsername(username) {
        this.username = username;}

    function getUsername() {
        return this.username;}

    function setPassword(password) {
        this.password = password;}

    function getPassword(password) {
        return this.password;}

    function setEmailId(emailId) {
        this.emailId = emailId;}

    function getEmailId(emailId) {
        return this.emailId;}

    function getFirstName(firstname){
        return this.firstname;}

    function setFirstName(firstname){
        this.firstname = firstname;}

    function getLastName(lastname){
        return this.lastname;}

    function setLastName(lastname){
        this.lastname = lastname;}

    function getPhone(phone){
        return this.phone;}

    function setPhone(phone){
        this.phone =phone;}

    function getRole(role){
        return this.role;}

    function setRole(role){
        this.role = role;}

    function getDOB(dob){
        return this.dob;}

    function setDOB(dob){
        this.dob = dob;}
}