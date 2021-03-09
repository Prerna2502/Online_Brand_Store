import AddStockModal from '../../EmployeeComponents/EmployeeStocks/AddStockModal/AddStockModal'
import enzyme,{shallow} from 'enzyme'
import Modal from 'react-bootstrap/Modal'
describe("AddStockModal Component testing",()=>{
    const wrapper=shallow(<AddStockModal/>)
    it("check AddStockModal cotain label for Product Id",()=>{
        expect(wrapper.find(  <label htmlFor="pid">Product Id:</label>)).toBeTruthy();
    });

    it("check AddStockModal contain label for Quantity",()=>{
        expect(wrapper.find(<label htmlFor="quantity">Quantity:</label>)).toBeTruthy();
    });

    it("check AddStockModal contain input with id quantity",()=>{
        expect(wrapper.find('input#quantity')).toBeTruthy();
    });
   
    it("check AddStockModal contain Modal title Enter details for placing new Stock",()=>{
        expect(wrapper.find(
                    <Modal.Title id="contained-modal-title-vcenter">
                        Enter details for placing new stock:
                    </Modal.Title>
            )).toBeTruthy();
    });
})