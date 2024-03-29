export let BannerAlert = (() => {
	
	let store = {};
	
    let Constructor = function( options ) {
	
		let state = {
			active : true
		}
		
        let publicMethods = {};
        let privateMethods = {};
        
        let settings; 
        
        privateMethods.getNodeTemplate = function() {
	        
	        let nodeColumn   = document.createElement( 'div' );
	        let nodeTemplate = document.createElement( 'div' );
	        let messageNode  = document.createElement( 'div' );
	        let buttonNode   = document.createElement( 'button' ); 
	        
	        nodeColumn.classList.add( ...settings.classList );
			nodeColumn.setAttribute( 'data-ref', settings.id );
			nodeTemplate.setAttribute( 'data-alert-message', settings.id );
			nodeTemplate.setAttribute( 'data-message-type', settings.messageType ); 
			nodeTemplate.setAttribute( 'data-status', 'active' ); 
			messageNode.classList.add( 'message' ); 
			
			messageNode.innerHTML = settings.message;
		
			buttonNode.classList.add( ...settings.buttonClassList, 'close-button' );
			buttonNode.innerHTML = settings.buttonText;

			privateMethods.closeAlertEventListener( buttonNode );
			
			nodeTemplate.appendChild( messageNode ); 
			nodeTemplate.appendChild( buttonNode );
			
			nodeColumn.appendChild( nodeTemplate );
			
	        return nodeColumn;
	        
        }
        
        privateMethods.show = function( target ) {
	        
            target.setAttribute( 'data-status', 'active' ); 
            publicMethods.updateState( { 'active' : true } );

        }

        privateMethods.hide = function( target ) {

	        if( target.getAttribute( 'data-alert-message' ) !== null ) {
				target.parentElement.remove();
			}

            target.setAttribute( 'data-status', 'inactive' );
            publicMethods.updateState( { 'active' : false } );

        }
        
        publicMethods.updateState = function( newState ) {
            
            for( let setting in newState ) {
                state[ setting ] = newState[ setting ];
            }

        }

        publicMethods.getState = function( fieldName = '' ) {
	        
	        if( fieldName == '' ) {
		        return state;
	        } else { 
		        return state[ fieldName ];
	        }
	        
        }
        
        publicMethods.hideAlert = function() {

            privateMethods.hide( settings.target );    

        }
		
		publicMethods.render = function() {
			
			let bannerAlertContainer = privateMethods.getNodeTemplate( settings );
			settings.target = bannerAlertContainer.querySelector( '[data-alert-message]' );
			
			if( !settings.parentContainer ) {
				alert( settings.message );
			} else {
				settings.parentContainer.prepend( bannerAlertContainer );

				setTimeout( function() { 
					publicMethods.hideAlert();
				}, settings.messageTtl );
			}
				
		}
		
		publicMethods.init = function( options ) {
			settings = options;
		}
		
	    privateMethods.closeAlertEventListener = function( targetButton ) {
		    
		    window.addEventListener( 'click', function( e ){
			    
				if( e.target == targetButton ) {
					publicMethods.hideAlert();
				}
				   
		    });
		    
	    }

		publicMethods.init( options );
		return publicMethods;	

    }
    
    const getAllAlerts = function( name, obj ) {
        return store; 
    }

	const storeBannerAlert = function( name, obj ) {
		store[ name ] = obj;
	}

	const registerBannerAlert = function( 
		messageType = 'message', 
		message = 'Message not provide', 
		parentContainer = false, 
		messageTtl = 20000, 
		classList = [],
		buttonClassList = [], 
		buttonText = '&times;'
	) {

		let moduleName = 'systemAlert';
		let moduleId   = ensureUniqueKey( returnRandomKey( moduleName ), Object.keys( store ), moduleName ); 

		storeBannerAlert(
			moduleId, 
			new BannerAlert.init({
				id              : moduleId,
				message         : message,
				messageTtl      : messageTtl,
				messageType     : messageType, 
				parentContainer : parentContainer, 
				classList       : classList, 
				buttonClassList : buttonClassList, 
				buttonText      : buttonText, 
			})
		);
	
		store[ moduleId ].render();
		
	}

    const ensureUniqueKey = function( newKey, existingKeys, moduleName ) {
    
        for( let i = 0; i < existingKeys.length; i++ ) {
            if( newKey === existingKeys[ i ] ) { 
                ensureUniqueKey( newKey, existingKeys, moduleName );
            }
        }

        return newKey;
        
    }

    const returnRandomKey = function( moduleName ) {
        return 'module_' + moduleName + '_' + Math.floor( Math.random() * Math.floor( 100000 ) );
    }
	
    return {
		init   : Constructor,
        getAllAlerts : getAllAlerts,
        transmit : registerBannerAlert
    }

})();