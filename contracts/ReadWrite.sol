pragma solidity ^0.4.19;

contract ReadWrite {
    string public store; 
    
    event Write(
        string store
    );
    
    function setStore(string storeParam) public {
        store = storeParam;
        emit Write(store);
    }
    
}