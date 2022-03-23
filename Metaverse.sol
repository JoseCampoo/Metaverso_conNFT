//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

//Openzeppelin imports
import "@openzeppelin/contracts@4.4.2/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts@4.4.2/access/Ownable.sol";
import "@openzeppelin/contracts@4.4.2/utils/Counters.sol";

//ADDRESS contract: 0xD82547E7E826Fe6CEf024A45dc476f07ae8b302D

// Creation of the Jose Metaverse Smart Contract with NFT Tokens
contract Metaverse is ERC721, Ownable {

// Cosntructor
constructor() ERC721("CLUBBING", "CLB"){}

    //Counters to regulate the current amount of NFT Tokens Minted
    using Counters for Counters.Counter;
    Counters.Counter private supply;

    // Total number of NFT available for creation
    uint256 public maxSupply = 100;

    // Cost to be pais for aerch NFT Token 
    uint256 public cost = 0 ether;

    //Owner and its properties in the Metaverse
    mapping (address => Building []) NFTOwners;

    //Metaverse Buildings
    struct Building {
        string name;
        int w;
        int h;
        int d;
        int x;
        int y;
        int z;
    }

    //List of Metaverse buildings
    Building[] public buildings;

    //Objatining the buildings made in the Metaverse
    function getBuildings() public view returns (Building [] memory) {
        return buildings;
    }

    //Current supply of NFT Tokens
    function totalSupply() public view returns (uint){
        return supply.current();

    }

    // Creation of the Buildings as an NFT Token in the Metaverse. PAYABLE
    function mint(string memory _building_name, int _w, int _h, int _d, int _x, int _y, int _z) public payable {
      require(supply.current() <= maxSupply, "Max supply exceeded!");
      require(msg.value >= cost, "Insufficient funds!");
      supply.increment();
      _safeMint(msg.sender, supply.current());
     Building memory _newBuild = Building(_building_name, _w, _h, _d, _x, _y, _z);
     buildings.push(_newBuild);
     NFTOwners[msg.sender].push(_newBuild);

    }

    //Extraction of ethers from the Smart Contract to the Owner
    function withdraw() external payable onlyOwner {
      address payable _owner = payable(owner());
      _owner.transfer(address(this).balance);
    }
    
    //Obtain a user´s Metaverse buildings
    function getOwnerBuildings() public view returns (Building [] memory){
        return NFTOwners[msg.sender];

    
    }
    

}