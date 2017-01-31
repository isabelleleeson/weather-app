var getUser = (id, callback) => {
    var user = {
        id: id,
        name: 'Toni'
    };
    
    setTimeout(() => {
        callback(user);
    }, 500);  
};

getUser(31, (userObject) => {
    console.log(userObject);
});