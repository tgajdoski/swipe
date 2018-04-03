import React, {Component} from 'react';
import {
    View,
    Animated,
    PanResponder
 } from 'react-native';



class Deck extends Component {

    constructor(props){
        super(props);
        this.position = new Animated.ValueXY();
        const panReposnder = PanResponder.create({
            // pan to be responsible for tap on the screen
            onStartShouldSetPanResponder: () => true,

            // callback on drag on the screen - called many many times
            onPanResponderMove :(event, gesture) => {
                position.setValue({x:gesture.dx , y: gesture.dy });
                console.log('gesture ' , gesture.dx, gesture.dy);
            },
            
            // callback on release - remove the finger from screen
            onPanResponderRelease: () =>{

            },
        });
        
        this._panReposnder = { panReposnder };
    }

    renderCards(){
        return this.props.data.map((item , index)=>{
            if (index === 0){
                <Animated.View 
                style = {this.position.getLayout()}
                {...this._panReposnder.panHandlers}
                >
                    {this.props.renderCard(item)}
                </Animated.View>
            }
            return this.props.renderCard(item); 
        });
    }

    render() {
        return (
            <View>
                {this.renderCards()}
            </View>    
        );
    }
}

export default Deck;