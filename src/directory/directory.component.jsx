import React from 'react';
import { connect} from 'react-redux';
import Menuitem from '../components/menu-item/menu-item.component'
import {selectDirectorySections} from '../redux/directory/directory.selectors';
import {createStructuredSelector} from 'reselect';
import './directory.styles.scss'


const Directory = ({sections}) => (
  
  <div className = 'directory-menu'>{

        sections.map(({id , ...otherSectionProps}) =>(
            <Menuitem key = {id} {...otherSectionProps} />

                    )
                        )
      }
    </div>
        
);

const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySections
});

export default connect(mapStateToProps)(Directory);