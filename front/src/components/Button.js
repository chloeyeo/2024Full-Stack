import styled from "styled-components";

const ButtonWrap = styled.button`
  padding: 5px 16px;
  display: block;
  background-color: red;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  &.text-button {
    background-color: white;
    color: black;
    border: 1px solid red;
  }
  &.small {
    font-size: 10px;
  }
`;

const TitleWrap = styled.h3`
  font-weight: bold;
  font-size: 2em;
`;

const ContentWrap = styled.section`
  font-size: 1em;
  color: red;
`;

const Button = ({ children, textOnly, className, ...props }) => {
  console.log(textOnly);
  let cssClasses = textOnly ? "text-button" : "button";
  cssClasses += " " + className;
  return (
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
