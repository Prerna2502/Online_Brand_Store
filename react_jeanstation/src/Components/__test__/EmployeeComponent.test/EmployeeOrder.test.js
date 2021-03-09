import AddOrdersModal from '../../EmployeeComponents/EmployeeOrders/AddOrdersModal/AddOrdersModal'
import enzyme,{shallow} from 'enzyme'
import Modal from 'react-bootstrap/Modal'
describe("AddOrdersModal Component testing",()=>{
    const wrapper=shallow(<AddOrdersModal/>)
    it("check AddOrdersModal cotain label for Product Id",()=>{
        expect(wrapper.find(  <label htmlFor="pid">Product Id:</label>)).toBeTruthy();
    });

    it("check AddOrdersModal cotain label for Address",()=>{
        expect(wrapper.find(  <label htmlFor="address">Address:</label>)).toBeTruthy();
    });

    it("check AddOrdersModal contain input with id contactno",()=>{
        expect(wrapper.find('input#contactno')).toBeTruthy();
    });

    it("check AddOrdersModal contain input with id quantity",()=>{
        expect(wrapper.find('input#quantity')).toBeTruthy();
    });
   
    it("check AddOrdersModal contain Modal title Enter details for placing new Order",()=>{
        expect(wrapper.find(
                    <Modal.Title id="contained-modal-title-vcenter">
                        Enter details for placing new Order:
                    </Modal.Title>
            )).toBeTruthy();
    });
})