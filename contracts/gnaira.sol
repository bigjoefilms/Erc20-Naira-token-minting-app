// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract gNGN {
    string public constant name = "gNGN";
    string public constant symbol = " NGN";
    uint8 public constant decimals = 18;
    uint256 public totalSupply;
    address public governor;

    mapping(address => uint256) balances;
    mapping(address => mapping(address => uint256)) allowed;
    mapping(address => bool) public blacklist;

     // Multi-signature wallet variables
    uint8 public constant MAX_OWNERS = 5;
    uint256 public numOwners;
    mapping(uint256 => address) public owners;
    mapping(address => mapping(uint256 => bool)) public isOwner;
    uint8 public numRequired;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    event Burn(address indexed from, uint256 value);
    event Blacklist(address indexed addr, bool isBlacklisted);
     event MultiSigTransfer(address indexed from, address indexed to, uint256 value);
    event MultiSigApproval(address indexed sender, address indexed from, address indexed to, uint256 value);


    constructor() payable {
        governor = msg.sender;
        totalSupply = 0;
    }

    modifier onlyGovernor() {
        require(msg.sender == governor, "Only governor can perform this action");
        _;
    }
     // Multi-signature wallet modifiers
    modifier onlyOwner() {
        require(isOwner[msg.sender][0], "Only owners can perform this action");
        _;
    }

    modifier onlyMultiSig() {
        require(numOwners > 1 && isOwner[msg.sender][1], "Only multi-signature wallet can perform this action");
        _;
    }

    function mint(uint256 amount) public onlyGovernor {
        totalSupply += amount;
        balances[governor] += amount;
        emit Transfer(address(0), governor, amount);
    }

    function burn(uint256 amount) public onlyGovernor {
        require(balances[governor] >= amount, "Not enough balance");
        totalSupply -= amount;
        balances[governor] -= amount;
        emit Burn(governor, amount);
    }

    function transfer(address to, uint256 value) public returns (bool) {
        require(!blacklist[msg.sender], "Your address has been blacklisted");
        require(balances[msg.sender] >= value, "Not enough balance");
        balances[msg.sender] -= value;
        balances[to] += value;
        emit Transfer(msg.sender, to, value);
        return true;
    }

    function balanceOf(address owner) public view returns (uint256) {
        return balances[owner];
    }

    function approve(address spender, uint256 value) public returns (bool) {
        allowed[msg.sender][spender] = value;
        emit Approval(msg.sender, spender, value);
        return true;
    }

    function allowance(address owner, address spender) public view returns (uint256) {
        return allowed[owner][spender];
    }

    function transferFrom(address from, address to, uint256 value) public returns (bool) {
        require(!blacklist[from], "Your address has been blacklisted");
        require(balances[from] >= value, "Not enough balance");
        require(allowed[from][msg.sender] >= value, "Not enough allowance");
        balances[from] -= value;
        allowed[from][msg.sender] -= value;
        balances[to] += value;
        emit Transfer(from, to, value);
        return true;
    }

    function blacklistAddress(address addr, bool isBlacklisted) public onlyGovernor {
        blacklist[addr] = isBlacklisted;
        emit Blacklist(addr, isBlacklisted);
    }
}