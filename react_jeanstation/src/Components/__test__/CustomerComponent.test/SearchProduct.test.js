import SearchProduct from '../../CustomerComponents/SearchProduct/SearchProduct'
import enzyme,{shallow} from 'enzyme'
describe("SearchProduct Component testing",()=>{
    const wrapper=shallow(<SearchProduct/>)
    it("check SearchProduct contain Caption Matching Products",()=>{
        expect(wrapper.find('Matching Products')).toBeTruthy();
    });

    it("check SearchProduct contain div with class container",()=>{
        expect(wrapper.find('div.container')).toBeTruthy();
    });

    it("check SearchProduct contain Caption Matching Products",()=>{
        expect(wrapper.find('div.h1.text-center')).toBeTruthy();
    });
})