import React from 'react'
import Decrease from 'material-ui-icons/RemoveCircle'
import Increase from 'material-ui-icons/AddCircle'
import DecreaseDep from 'material-ui-icons/RemoveCircleOutline'
import IncreaseDep from 'material-ui-icons/AddCircleOutline'
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as actions from "../../../redux/actions";
class Guests extends React.Component {
    render(){
        return(
    <div>
                            <div>
                                <p>Yetişkin Sayısı</p>


                                {this.props.main.reducer.adultNum >= 1 && this.props.main.reducer.adultNum !== 6 ?
                                   <Increase onClick={this.props.actions.incAdultNum}/> :
                                    <IncreaseDep disabled/>}

                                {this.props.main.reducer.adultNum}

                                {this.props.main.reducer.adultNum > 1 ?
                                    <Decrease onClick={this.props.actions.decAdultNum}/> :
                                    <DecreaseDep disabled/>}

                            </div>
                            <div>
                                <p>Çocuk Sayısı</p>
                                {this.props.main.reducer.childNum >= 0 && this.props.main.reducer.childNum !== 6 ?
                                    <Increase onClick={this.props.actions.incChildNum}/> :
                                    <IncreaseDep disabled/>}
                                {this.props.main.reducer.childNum}
                                {this.props.main.reducer.childNum > 0 ?
                                    <Decrease onClick={this.props.actions.decChildNum}/> :
                                    <DecreaseDep disabled/>}
                                <div>
                                    {
                                        this.props.main.reducer.childNum > 0 ? <div><p>Çocuk Yaşları</p>
                                                {this.props.main.reducer.childNumCont.length > 0 ? this.props.main.reducer.childNumCont.map(chd => {
                                                    return (
                                                        <div>
                                                            <button disabled>Increase</button>
                                                            <button disabled>Decrease</button>
                                                        </div>
                                                    )
                                                }) : ''}
                                            </div>

                                            : ''}
                                </div>
                            </div>
    </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        main: state,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({...actions}, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Guests);
