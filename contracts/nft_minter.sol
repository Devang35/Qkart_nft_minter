// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract nft_minter {

    mapping(address => uint) public tokenOfOwner;
    mapping(uint => address) public ownerOf;
    mapping(uint => string) public tokenURI;
    uint public totalSupply;

    event Transfer(address indexed _from, address indexed _to, uint256 _tokenId);

    constructor() public {
        totalSupply = 0;
    }

    function mint(string memory _tokenURI) public {
        totalSupply++;
        tokenOfOwner[msg.sender] = totalSupply;
        ownerOf[totalSupply] = msg.sender;
        tokenURI[totalSupply] = _tokenURI;
        emit Transfer(address(0), msg.sender, totalSupply);
    }
}
