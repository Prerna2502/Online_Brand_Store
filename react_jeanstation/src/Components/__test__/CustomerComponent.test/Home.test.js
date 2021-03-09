import Home from '../../CustomerComponents/HomePage/Home'
import enzyme,{shallow} from 'enzyme'
describe("Home Component testing",()=>{
    const wrapper=shallow(<Home/>)

    it("check Home contain img tag",()=>{
        expect(wrapper.find('img')).toBeTruthy();
    });

    it("check CustomerAccount contain div with string First Name",()=>{
        expect(wrapper.find('.section#HeroSection')).toBeTruthy();
    });

    it("check Home contain h1 tag with string Welcome To JeanStation",()=>{
        expect(wrapper.contains( <h1>Welcome To JeanStation</h1>)).toBeTruthy()
    });

    it("check Home contain div with HeroCaption class",()=>{
        expect(wrapper.find('div.HeroCaption')).toBeTruthy();
    });
})