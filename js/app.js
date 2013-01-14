(function($) {

	var Question = Backbone.Model.extend( {
		defaults : {
			coverImage : "img/placeholder.png",
			title : "Some title",
			author : "John Doe",
			releaseDate : "2012",
			keywords : "JavaScript Programming"
		}
	});

	var Quiz = Backbone.Collection.extend( {
		model : Question
	});

	var QuestionView = Backbone.View.extend( {
		tagName : "div",
		className : "questionContainer",
		template : $("#questionTemplate").html(),
		render : function() {
			var tmpl = _.template(this.template);
			this.$el.html(tmpl(this.model.toJSON()));
			return this;
		},

		deleteQuestion : function() {
			this.model.destroy();
			this.remove();
		},
		
		events: {
			"click .delete" : "deleteQuestion"
		}
	});

	var QuizView = Backbone.View.extend( {
		el : $("#quiz"),

		initialize : function() {
			this.collection = new Quiz(quiz);
			this.render();
			this.collection.on("add", this.renderQuestion, this);
			this.collection.on("remove", this.removeQuestion, this);
		},

		render : function() {
			that = this;
			_.each(this.collection.models, function(item) {
				that.renderQuestion(item);
			}, this);
		},

		renderQuestion : function(item) {
			var questionView = new QuestionView( {
				model : item
			});
			this.$el.append(questionView.render().el);
		},

		addQuestion : function(e) {
			e.preventDefault();
			var formData = {};
			$("#addQuestion div").children("input").each(function(i, el) {
				if ($(el).val() !== "") {
					formData[el.id] = $(el).val();
				}
			});
			quiz.push(formData);
			this.collection.add(new Question(formData));
		},
		
		removeQuestion: function(removedQuestion){
			var removedQuestionData = removedQuestion.attributes;
		    _.each(removedQuestionData, function(val, key){
		        if(removedQuestionData[key] === removedQuestion.defaults[key]){
		            delete removedQuestionData[key];
		        }
		    });
			_.each(quiz, function(question){
				if(_.isEqual(question, removedQuestionData)){
					quiz.splice(_.indexOf(quiz, question), 1);
				}
			});
		},

		events : {
			"click #add" : "addQuestion"
		}
	});

	var quiz = [ {
		title : "JS the good parts",
		author : "John Doe",
		releaseDate : "2012",
		keywords : "JavaScript Programming"
	}, {
		title : "CS the better parts",
		author : "John Doe",
		releaseDate : "2012",
		keywords : "CoffeeScript Programming"
	}, {
		title : "Scala for the impatient",
		author : "John Doe",
		releaseDate : "2012",
		keywords : "Scala Programming"
	}, {
		title : "American Psyco",
		author : "Bret Easton Ellis",
		releaseDate : "2012",
		keywords : "Novel Splatter"
	}, {
		title : "Eloquent JavaScript",
		author : "John Doe",
		releaseDate : "2012",
		keywords : "JavaScript Programming"
	} ]

	var quizView = new QuizView();

})(jQuery);