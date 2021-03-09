import EmployeeLogOut from '../../EmployeeComponents/EmployeeLogOut/EmployeeLogOut'
import Modal from 'react-bootstrap/Modal'
import Enzyme,{shallow} from 'enzyme'
describe("EmployeeLogOut Component testing",()=>{
    const wrapper=shallow(<EmployeeLogOut/>)
    it("check EmployeeLogOut p tag Are you sure you want to LogOut?",()=>{
        expect(wrapper.find(<p>Are you sure you want to LogOut?</p>)).toBeTruthy();
    });

    it("check EmployeeLogOut contain Login button",()=>{
        expect(wrapper.find('Modal')).toBeTruthy();
    });

    it("check EmployeeLogOut contain div with login_admin_form class",()=>{
        expect(wrapper.find('Modal.Body.contained-modal-title-vcenter')).toBeTruthy();
    });
   
    it("check EmployeeLogOut contain div with loginForm class",()=>{
        expect(wrapper.find(
            <Modal.Title id="contained-modal-title-vcenter">
                    Confirm LogOut
                </Modal.Title>
        )).toBeTruthy();
    });
})