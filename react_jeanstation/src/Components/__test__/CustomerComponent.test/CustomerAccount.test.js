import CustomerAccount from '../../CustomerComponents/CustomerAccount/CustomerAccount'
import enzyme,{shallow} from 'enzyme'
describe("CustomerAccount Component testing",()=>{
    const wrapper=shallow(<CustomerAccount/>)
    it("check CustomerAccount contain string Account Details",()=>{
        expect(wrapper.find('Account Details')).toBeTruthy();
    });

    it("check CustomerAccount contain div with string First Name",()=>{
        expect(wrapper.find(
            <div class="p-2 flex-fill bd-highlight col-md-4">First Name</div>
        )).toBeTruthy();
    });

    it("check CustomerAccount contain label for Last Name",()=>{
        expect(wrapper.contains( <label for="lastName" class="col-sm-3 col-form-label">Last Name</label>)).toBeTruthy()
    });

    it("check CustomerAccount contain div with form-group class",()=>{
        expect(wrapper.find('div.form-group')).toBeTruthy();
    });
})