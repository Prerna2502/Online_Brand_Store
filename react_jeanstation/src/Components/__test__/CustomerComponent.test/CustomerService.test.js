import CustomerService from '../../CustomerComponents/CustomerService/CustomerService'
import enzyme,{shallow} from 'enzyme'
describe("CustomerService Component testing",()=>{
    const wrapper=shallow(<CustomerService/>)
    it("check CustomerService contain h4 tag with string Questions about an issue?",()=>{
        expect(wrapper.find( <h4 class="alert-heading">Questions about an issue? </h4>)).toBeTruthy();
    });

    it("check CustomerService contain p with string Or come meet us",()=>{
        expect(wrapper.contains(<p class="mb-0">Or come meet us </p>)).toBeTruthy();
    });

    it("check CustomerService contain label for Last Name",()=>{
        expect(wrapper.find('div.main')).toBeTruthy()
    });

})