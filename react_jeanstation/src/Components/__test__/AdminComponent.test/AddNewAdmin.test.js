import AddModal from '../../AdminComponents/AddNewAdmin/AddModal/AddModal'
import enzyme,{shallow} from 'enzyme'
import Modal from 'react-bootstrap/Modal'
describe("AddNewAdmin Component testing",()=>{
    const wrapper=shallow(<AddModal/>)
    it("check AddNewAdmin cotain label for Admin Id",()=>{
        expect(wrapper.find( <label for="adminid">Admin Id:</label>)).toBeTruthy();
    });

    it("check AddNewAdmin contain input with id adminid",()=>{
        expect(wrapper.find('input#adminid')).toBeTruthy();
    });

    it("check AddNewAdmin contain input with adminpassword",()=>{
        expect(wrapper.find('input#adminpassword')).toBeTruthy();
    });
   
    it("check AddNewAdmin contain Modal title Enter details for new Admin",()=>{
        expect(wrapper.find(
                <Modal.Title id="contained-modal-title-vcenter">
                    Enter details for new Admin:
                </Modal.Title>
            )).toBeTruthy();
    });
})