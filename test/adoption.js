var Adoption = artifacts.require("Adoption");

contract('Adoption', function(accounts) {
  describe('First group of tests', () => {
    let instance ;

    before(async () => {
      instance = await Adoption.deployed()
    });

    it('User should adopt a pet', async () => {
      await instance.adopt.sendTransaction(8, {from: accounts[0]});
      // await wait for result before contiuing
      // use sendTransaction if function changes something in the block chain

      let adopter = await instance.adopters.call(8);
      // for getter fucntions only use the function name.call

      assert.equal(adopter, accounts[0], "Incorrect owner");
    });

    // make test async as making call to the block chain
    it('Should get adopter address by pet id in array', async () => {
      let adopters = await instance.getAdopters.call(); // just getter

      assert.equal(adopters[8], accounts[0], "Owner of pet id 8 should be in array");
    });
    
    it('Should throw error if invalid pet id is given', async () => {
      try {
        await instance.adopt.sendTransaction(17, {from: accounts[0]});
        assert.fail(true, false, "This function did not throw");
      } catch (error) {
        assert.include(String(error), "revert", `Expected "revert" but istead got ${error}`);
      }
    }); 
  });
});
