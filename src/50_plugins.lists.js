
(function () {

//  SETUP BUTTONS ------------------------------------------------------------------------------------------------------------

	WMD.registerButton('ol', {titleText:'Numbered List <ol> Ctrl+O', shortcut:'o'});
	WMD.registerButton('ul', {titleText:'Bulleted List <ul> Ctrl+U', shortcut:'u'});


//  LIST AUTO FORMATTING -----------------------------------------------------------------------------------------------------

	WMD.subscribe('editor-created', function () {
		var that = this;		
		
		// Auto-continue lists, code blocks and block quotes when
		// the enter key is pressed.
		if (!!that.options.autoFormatting) util.addEvent(that.panels.input, "keyup", function (key) {
			
			if (!key.shiftKey && !key.ctrlKey && !key.metaKey) {
				var keyCode = key.charCode || key.keyCode;
				// Key code 13 is Enter
				if (keyCode === 13) {// ENTER KEY

					var chunk = this.selection.get();
					if (that.options.autoFormatting.list) chunk.before = chunk.before.replace(/(\n|^)[ ]{0,3}([*+\-]|\d+[.])[ \t]*\n$/, "\n\n");
					if (that.options.autoFormatting.quote) chunk.before = chunk.before.replace(/(\n|^)[ ]{0,3}>[ \t]*\n$/, "\n\n");
					if (that.options.autoFormatting.code) chunk.before = chunk.before.replace(/(\n|^)[ \t]+\n$/, "\n\n");

					if (that.options.autoFormatting.list) {
						if (/(\n|^)[ ]{0,3}([*+\-])[ \t]+.*\n$/.test(chunk.before)) {
							WMD.publish('toolbar-button:ul', self, [event, 'autoformatting']);
						}
						if (/(\n|^)[ ]{0,3}(\d+[.])[ \t]+.*\n$/.test(chunk.before)) {
							WMD.publish('toolbar-button:ol', self, [event, 'autoformatting']);
						}
					}

					if (that.options.autoFormatting.quote) {
						if (/(\n|^)[ ]{0,3}>[ \t]+.*\n$/.test(chunk.before)) {
							WMD.publish('toolbar-button:quote', self, [event, 'autoformatting']);
						}
					}

					if (that.options.autoFormatting.code) {
						if (/(\n|^)(\t|[ ]{4,}).*\n$/.test(chunk.before)) {
							WMD.publish('toolbar-button:code', self, [event, 'autoformatting']);
						}
					}

				}
			}
			
		});
		
	});




})();