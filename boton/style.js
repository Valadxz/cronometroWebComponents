const style = `
button{
    height: 35px;
    width: 110px;
    border-radius: 32px;
    border-style: solid;
    border-width: 1px;
    font-family: Verdana,Geneva,sans-serif;    
    margin: 0 auto; 
}
button:active {
    box-shadow: inset 0px 1px 2px 0px rgba(0,0,0,0.75);
    transform: translateY(4px);
}
button:focus {
    outline: none;
}
`;

export default style;