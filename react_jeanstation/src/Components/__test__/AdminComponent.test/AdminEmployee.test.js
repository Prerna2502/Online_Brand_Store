import AddEmployeeModal from '../../AdminComponents/AdminEmployees/AddEmployeeModal/AddEmployeeModal'
import enzyme,{shallow} from 'enzyme'
import Modal from 'react-bootstrap/Modal'
describe("AddEmployeeModal Component testing",()=>{
    const wrapper=shallow(<AddEmployeeModal/>)
    it("check AddEmployeeModalcotain label for Designation",()=>{
        expect(wrapper.find(<label htmlFor="designation">Designation:</label>)).toBeTruthy();
    });

    it("check AddEmployeeModal contain input with id employeeId",()=>{
        expect(wrapper.find('input#employeeId')).toBeTruthy();
    });

    it("check AddEmployeeModal contain input with id contactno",()=>{
        expect(wrapper.find('input#contactno')).toBeTruthy();
    });
   
    it("check AddEmployeeModal contain Modal title Enter details for new Admin",()=>{
        expect(wrapper.find(
                <Modal.Title id="contained-modal-title-vcenter">
                    Enter details for new Employee:
                </Modal.Title>
            )).toBeTruthy();
    });
})