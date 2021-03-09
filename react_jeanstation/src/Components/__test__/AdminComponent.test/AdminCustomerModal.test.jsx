import AddCustomerModal from '../../AdminComponents/AdminCustomer/AddCustomerModal/AddCustomerModal'
import enzyme,{shallow} from 'enzyme'
import Modal from 'react-bootstrap/Modal'
describe("AddNewAdmin Component testing",()=>{
    const wrapper=shallow(<AddCustomerModal/>)
    it("check AddCustomerModal cotain Modal Title Enter details for new Customer",()=>{
        expect(wrapper.contains( 
            <Modal.Title id="contained-modal-title-vcenter">
                        Enter details for new Customer:
                    </Modal.Title>
        )).toBeTruthy();
    });

    it("check AddCustomerModal contain input with id customerId",()=>{
        expect(wrapper.find('input#customerId')).toBeTruthy();
    });

    it("check AddCustomerModal contain input with id password",()=>{
        expect(wrapper.find('input#password')).toBeTruthy();
    });
   
    it("check AddCustomerModal contain label for First Name",()=>{
        expect(wrapper.find(
            <label htmlFor="fname">First Name:</label>
            )).toBeTruthy();
    });
})