import { checkBuyerPassword, createBuyer, findAllBuyers, findBuyerById, updateBuyerPassword } from "../models/buyers"

describe('buyer data layer', () => {

    it('should find no buyers in an empty database', async () => {
        // setup

        // execute
        const buyers = await findAllBuyers()

        //verify
        expect(buyers.length).toEqual(0)
    })

    it('should list a buyer that was created', async () => {
        // setup
        await createBuyer("tonytonetoni", "tony@toni.tone", "123456")

        // execute
        const buyers = await findAllBuyers()

        //verify
        expect(buyers.length).toEqual(1)
        const buyer = buyers[0]
        expect(buyer.username).toEqual('tonytonetoni')
        expect(buyer.email).toEqual('tony@toni.tone')
    })

    it('should find a buyer by id', async () => {
        // setup
        const actualBuyer = await createBuyer("tonytonetoni", "tony@toni.tone", "123456")

        // execute
        const buyer = await findBuyerById(actualBuyer._id)

        //verify
        expect(buyer.username).toEqual('tonytonetoni')
        expect(buyer.email).toEqual('tony@toni.tone')
    })

    it('should successfully check a buyer password', async () => {
        // setup
        const actualBuyer = await createBuyer("tonytonetoni", "tony@toni.tone", "123456")

        // execute
        const passed = await checkBuyerPassword(actualBuyer._id, "123456")

        //verify
        expect(passed).toEqual(true)
    })

    it('should unsuccessfully check a buyer password', async () => {
        //set up
        const actualBuyer = await createBuyer("tonytonetoni", "tony@toni.tone", "123456")

        //execute 
        const passed = await checkBuyerPassword(actualBuyer._id, "nopassword")

        //verify
        expect(passed).toEqual(false)
        //throw new Error('Implement me!')
    })

    it('should update buyer password', async () => {
        //set up
        const actualBuyer = await createBuyer("tonytonetoni", "tony@toni.tone", "123456")

        //execute 
      await updateBuyerPassword(actualBuyer._id, "newPass")
        
        //verify
       // console.log(passed);
       const passed = await checkBuyerPassword( actualBuyer._id,"newPass")
        expect(passed).toEqual(true)
        //throw new Error('Implement me!')
    })

})