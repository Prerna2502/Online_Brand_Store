import AdminLogOut from '../../AdminComponents/AdminLogOut/AdminLogOut'
import Modal from 'react-bootstrap/Modal'
import Enzyme,{shallow} from 'enzyme'
describe("AdminLogin Component testing",()=>{
    const wrapper=shallow(<AdminLogOut/>)
    it("check AdminLogOut p tag Are you sure you want to LogOut?",()=>{
        expect(wrapper.find(<p>Are you sure you want to LogOut?</p>)).toBeTruthy();
    });

    it("check AdminLogOut contain Login button",()=>{
        expect(wrapper.find('Modal')).toBeTruthy();
    });

    it("check AdminLogOut contain div with login_admin_form class",()=>{
        expect(wrapper.find('Modal.Body.contained-modal-title-vcenter')).toBeTruthy();
    });
   
    it("check AdminLogOut contain div with Modal title class",()=>{
        expect(wrapper.find(
            <Modal.Title id="contained-modal-title-vcenter">
                    Confirm LogOut
                </Modal.Title>
        )).toBeTruthy();
    });
})