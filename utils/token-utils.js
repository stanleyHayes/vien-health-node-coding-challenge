const encode = (userToken, {email, name}) => {
    let pieces = userToken.split('.');
    const stringPayload = JSON.stringify({email, name}); 
    let tokenPieces = [pieces[0], stringPayload, pieces[1], pieces[2]];
    return tokenPieces.join('.');
}

const decode = data => {
    const pieces = data.split('.');
    return [pieces[0], pieces[2], pieces[3]].join('.');
}

module.exports =  {encode, decode};