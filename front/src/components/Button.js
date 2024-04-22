import styled from "styled-components";

/* this style does not apply to other components. this is a completely individual
styling just for the ButtonWrap component in the entire app. Better than tailwind if you want individual styling.
grammar is similar to sass, e.g. $ 
styled.button, styled.h3, styled.div, etc*/
const ButtonWrap = styled.button`
  padding: 5px 16px;
  display: block;
  background-color: red;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  $.text-button {
    background-color: white;
    color: black;
    border: 1px solid red;
  }
  $.small {
    font-size: 10px;
  }
`; // a component = start with Capital letter

const TitleWrap = styled.h3`
  font-weight: bold;
  font-size: 2em;
`;

const ContentWrap = styled.section`
  font-size: 1em;
  color: red;
`;

const Button = ({ children, textOnly, className, ...props }) => {
  let cssClasses = textOnly ? "text-button" : "button";
  cssClasses += " " + className;
  return (
    // replace <button> with <ButtonWrap>
    <div>
      <ButtonWrap className={cssClasses} {...props}>
        {children}
      </ButtonWrap>
      <TitleWrap>
        <h3>test</h3>
      </TitleWrap>
      <ContentWrap>
        <section>content</section>
      </ContentWrap>
    </div>
  );
};

export default Button;
